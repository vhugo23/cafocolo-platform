package com.cafocolo_api.quote;

import com.cafocolo_api.quotelineitem.QuoteLineItem;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Public-safe quote response for customer review links.
 *
 * Why this exists:
 * - Customers should be able to review a quote without admin access.
 * - The public response should not expose internal admin-only data or raw database structure.
 */
public class PublicQuoteResponse {

    private String projectName;
    private String customerName;
    private String title;
    private String description;
    private BigDecimal estimatedLaborCost;
    private BigDecimal estimatedMaterialCost;
    private BigDecimal additionalCosts;
    private BigDecimal totalAmount;
    private String status;
    private LocalDate validUntil;
    private LocalDateTime publicTokenExpiresAt;
    private LocalDateTime customerViewedAt;
    private LocalDateTime approvedAt;
    private LocalDateTime declinedAt;
    private String customerDecisionNote;
    private List<PublicQuoteLineItemResponse> lineItems;

    public PublicQuoteResponse(Quote quote, List<QuoteLineItem> lineItems) {
        this.projectName = quote.getProject().getProjectName();
        this.customerName = quote.getProject().getLead().getCustomer().getFullName();
        this.title = quote.getTitle();
        this.description = quote.getDescription();
        this.estimatedLaborCost = quote.getEstimatedLaborCost();
        this.estimatedMaterialCost = quote.getEstimatedMaterialCost();
        this.additionalCosts = quote.getAdditionalCosts();
        this.totalAmount = quote.getTotalAmount();
        this.status = quote.getStatus().name();
        this.validUntil = quote.getValidUntil();
        this.publicTokenExpiresAt = quote.getPublicTokenExpiresAt();
        this.customerViewedAt = quote.getCustomerViewedAt();
        this.approvedAt = quote.getApprovedAt();
        this.declinedAt = quote.getDeclinedAt();
        this.customerDecisionNote = quote.getCustomerDecisionNote();
        this.lineItems = lineItems.stream()
                .map(PublicQuoteLineItemResponse::new)
                .toList();
    }

    public String getProjectName() {
        return projectName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getEstimatedLaborCost() {
        return estimatedLaborCost;
    }

    public BigDecimal getEstimatedMaterialCost() {
        return estimatedMaterialCost;
    }

    public BigDecimal getAdditionalCosts() {
        return additionalCosts;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public LocalDate getValidUntil() {
        return validUntil;
    }

    public LocalDateTime getPublicTokenExpiresAt() {
        return publicTokenExpiresAt;
    }

    public LocalDateTime getCustomerViewedAt() {
        return customerViewedAt;
    }

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public LocalDateTime getDeclinedAt() {
        return declinedAt;
    }

    public String getCustomerDecisionNote() {
        return customerDecisionNote;
    }

    public List<PublicQuoteLineItemResponse> getLineItems() {
        return lineItems;
    }
}