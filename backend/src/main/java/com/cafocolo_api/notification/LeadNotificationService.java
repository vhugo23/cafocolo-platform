package com.cafocolo_api.notification;

import com.cafocolo_api.lead.CreateLeadRequest;
import com.cafocolo_api.lead.Lead;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

/**
 * Sends internal notifications when important business events happen.
 *
 * Why this exists:
 * - The public website can create quote requests at any time.
 * - Cafocolo should not need to manually check the admin dashboard every day.
 * - A notification email turns the lead system into an operational workflow.
 *
 * Production design decision:
 * - This service uses Resend over HTTPS instead of Gmail SMTP.
 * - Render free services block outbound SMTP ports, but HTTPS API calls work.
 * - Email failure is non-blocking: the lead is still saved even if notification fails.
 */
@Service
public class LeadNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(LeadNotificationService.class);
    private static final URI RESEND_EMAILS_URI = URI.create("https://api.resend.com/emails");

    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;
    private final boolean notificationsEnabled;
    private final String notificationRecipient;
    private final String notificationSender;
    private final String resendApiKey;

    public LeadNotificationService(
            @Value("${cafocolo.notifications.enabled:false}") boolean notificationsEnabled,
            @Value("${cafocolo.notifications.to:}") String notificationRecipient,
            @Value("${cafocolo.notifications.from:}") String notificationSender,
            @Value("${cafocolo.resend.api-key:}") String resendApiKey
    ) {
        this.objectMapper = new ObjectMapper();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.notificationsEnabled = notificationsEnabled;
        this.notificationRecipient = notificationRecipient;
        this.notificationSender = notificationSender;
        this.resendApiKey = resendApiKey;
    }

    public void sendNewLeadNotification(Lead lead, CreateLeadRequest request) {
        if (!notificationsEnabled) {
            logger.info("Lead notification email skipped because notifications are disabled.");
            return;
        }

        if (!StringUtils.hasText(resendApiKey)) {
            logger.warn("Lead notification email skipped because CAFOCOLO_RESEND_API_KEY is not configured.");
            return;
        }

        if (!StringUtils.hasText(notificationRecipient)) {
            logger.warn("Lead notification email skipped because no recipient is configured.");
            return;
        }

        if (!StringUtils.hasText(notificationSender)) {
            logger.warn("Lead notification email skipped because no sender is configured.");
            return;
        }

        try {
            String requestBody = objectMapper.writeValueAsString(Map.of(
                    "from", notificationSender,
                    "to", new String[]{notificationRecipient},
                    "subject", "New Cafocolo quote request from " + request.getFullName(),
                    "text", buildEmailTextBody(lead, request),
                    "html", buildEmailHtmlBody(lead, request)
            ));

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(RESEND_EMAILS_URI)
                    .timeout(Duration.ofSeconds(20))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(
                    httpRequest,
                    HttpResponse.BodyHandlers.ofString()
            );

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                logger.info("Lead notification email sent for lead {} through Resend.", lead.getId());
                return;
            }

            logger.error(
                    "Failed to send lead notification email for lead {}. Resend status: {}. Body: {}",
                    lead.getId(),
                    response.statusCode(),
                    response.body()
            );
        } catch (IOException exception) {
            logger.error("Failed to build or send lead notification email for lead {}", lead.getId(), exception);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            logger.error("Lead notification email send was interrupted for lead {}", lead.getId(), exception);
        }
    }

    private String buildEmailTextBody(Lead lead, CreateLeadRequest request) {
        return """
                A new quote request was submitted through the Cafocolo website.

                Lead ID:
                %s

                Customer:
                %s

                Phone:
                %s

                Email:
                %s

                City:
                %s

                Requested Service:
                %s

                Project Location:
                %s

                Project Description:
                %s

                Next step:
                Log in to the Cafocolo admin portal to review the lead, update its status, and decide whether to turn it into a project.
                """.formatted(
                lead.getId(),
                valueOrFallback(request.getFullName()),
                valueOrFallback(request.getPhoneNumber()),
                valueOrFallback(request.getEmail()),
                valueOrFallback(request.getCity()),
                valueOrFallback(request.getRequestedService()),
                valueOrFallback(request.getLocation()),
                valueOrFallback(request.getProjectDescription())
        );
    }

    private String buildEmailHtmlBody(Lead lead, CreateLeadRequest request) {
        return """
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1c1917;">
                  <h2>New Cafocolo quote request</h2>
                  <p>A new quote request was submitted through the Cafocolo website.</p>

                  <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                    <tr>
                      <td><strong>Lead ID</strong></td>
                      <td>%s</td>
                    </tr>
                    <tr>
                      <td><strong>Customer</strong></td>
                      <td>%s</td>
                    </tr>
                    <tr>
                      <td><strong>Phone</strong></td>
                      <td>%s</td>
                    </tr>
                    <tr>
                      <td><strong>Email</strong></td>
                      <td>%s</td>
                    </tr>
                    <tr>
                      <td><strong>City</strong></td>
                      <td>%s</td>
                    </tr>
                    <tr>
                      <td><strong>Requested Service</strong></td>
                      <td>%s</td>
                    </tr>
                    <tr>
                      <td><strong>Project Location</strong></td>
                      <td>%s</td>
                    </tr>
                    <tr>
                      <td><strong>Project Description</strong></td>
                      <td>%s</td>
                    </tr>
                  </table>

                  <p><strong>Next step:</strong> Log in to the Cafocolo admin portal to review the lead, update its status, and decide whether to turn it into a project.</p>
                </div>
                """.formatted(
                escapeHtml(String.valueOf(lead.getId())),
                escapeHtml(valueOrFallback(request.getFullName())),
                escapeHtml(valueOrFallback(request.getPhoneNumber())),
                escapeHtml(valueOrFallback(request.getEmail())),
                escapeHtml(valueOrFallback(request.getCity())),
                escapeHtml(valueOrFallback(request.getRequestedService())),
                escapeHtml(valueOrFallback(request.getLocation())),
                escapeHtml(valueOrFallback(request.getProjectDescription()))
        );
    }

    private String valueOrFallback(String value) {
        return StringUtils.hasText(value) ? value : "Not provided";
    }

    private String escapeHtml(String value) {
        return value
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}