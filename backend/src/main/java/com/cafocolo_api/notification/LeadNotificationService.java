package com.cafocolo_api.notification;

import com.cafocolo_api.lead.CreateLeadRequest;
import com.cafocolo_api.lead.Lead;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Sends internal notifications when important business events happen.
 *
 * Why this exists:
 * - The public website can create quote requests at any time.
 * - Cafocolo should not need to manually check the admin dashboard every day.
 * - A notification email turns the lead system into an operational workflow.
 *
 * Production design decision:
 * - Email is intentionally non-blocking from a business perspective.
 * - If the email fails, the lead should still remain saved in the database.
 */
@Service
public class LeadNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(LeadNotificationService.class);

    private final JavaMailSender mailSender;
    private final boolean notificationsEnabled;
    private final String notificationRecipient;
    private final String notificationSender;

    public LeadNotificationService(
            JavaMailSender mailSender,
            @Value("${cafocolo.notifications.enabled:false}") boolean notificationsEnabled,
            @Value("${cafocolo.notifications.to:}") String notificationRecipient,
            @Value("${cafocolo.notifications.from:}") String notificationSender
    ) {
        this.mailSender = mailSender;
        this.notificationsEnabled = notificationsEnabled;
        this.notificationRecipient = notificationRecipient;
        this.notificationSender = notificationSender;
    }

    public void sendNewLeadNotification(Lead lead, CreateLeadRequest request) {
        if (!notificationsEnabled) {
            logger.info("Lead notification email skipped because notifications are disabled.");
            return;
        }

        if (!StringUtils.hasText(notificationRecipient)) {
            logger.warn("Lead notification email skipped because no recipient is configured.");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(notificationRecipient);

            if (StringUtils.hasText(notificationSender)) {
                message.setFrom(notificationSender);
            }

            message.setSubject("New Cafocolo quote request from " + request.getFullName());
            message.setText(buildEmailBody(lead, request));

            mailSender.send(message);

            logger.info("Lead notification email sent for lead {}", lead.getId());
        } catch (MailException exception) {
            logger.error("Failed to send lead notification email for lead {}", lead.getId(), exception);
        }
    }

    private String buildEmailBody(Lead lead, CreateLeadRequest request) {
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

    private String valueOrFallback(String value) {
        return StringUtils.hasText(value) ? value : "Not provided";
    }
}