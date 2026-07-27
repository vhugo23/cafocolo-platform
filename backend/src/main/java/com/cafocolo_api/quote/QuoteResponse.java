package com.cafocolo_api.quote;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Response DTO for quote data.
 *
 * Why this exists:
 * - We avoid returning the raw Quote entity directly.
 * - This gives the API a stable response shape.
 */
public class QuoteResponse {

    private UUID id;
    private UUID projectId;
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
    private String publicToken;
    private LocalDateTime publicTokenExpiresAt;
    private LocalDateTime customerViewedAt;
    private LocalDateTime approvedAt;
    private LocalDateTime declinedAt;
    private String customerDecisionNote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public QuoteResponse(Quote quote) {
        this.id = quote.getId();
        this.projectId = quote.getProject().getId();
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
        this.publicToken = quote.getPublicToken();
        this.publicTokenExpiresAt = quote.getPublicTokenExpiresAt();
        this.customerViewedAt = quote.getCustomerViewedAt();
        this.approvedAt = quote.getApprovedAt();
        this.declinedAt = quote.getDeclinedAt();
        this.customerDecisionNote = quote.getCustomerDecisionNote();
        this.createdAt = quote.getCreatedAt();
        this.updatedAt = quote.getUpdatedAt();
    }

    public UUID getId() {
        return id;
    }

    public UUID getProjectId() {
        return projectId;
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

    public String getPublicToken() {
        return publicToken;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}