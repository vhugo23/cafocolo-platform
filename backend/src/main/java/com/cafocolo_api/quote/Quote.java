package com.cafocolo_api.quote;

import com.cafocolo_api.project.Project;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entity representing a quote or estimate for a project.
 *
 * Why this exists:
 * - A project may need a formal estimate before the customer approves the work.
 * - This entity maps Java code to the quotes table in PostgreSQL.
 */
@Entity
@Table(name = "quotes")
public class Quote {

    @Id
    private UUID id;

    /**
     * Many quotes can belong to one project.
     *
     * This maps to project_id in the quotes table.
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 150)
    private String title;

    @Column
    private String description;

    @Column(name = "estimated_labor_cost")
    private BigDecimal estimatedLaborCost;

    @Column(name = "estimated_material_cost")
    private BigDecimal estimatedMaterialCost;

    @Column(name = "additional_costs")
    private BigDecimal additionalCosts;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private QuoteStatus status;

    @Column(name = "valid_until")
    private LocalDate validUntil;

    /**
     * Public token used for customer-facing quote review links.
     *
     * Why:
     * - Customers should not need an admin account to review a quote.
     * - The public URL should use an opaque token instead of exposing admin auth.
     */
    @Column(name = "public_token", length = 96, unique = true)
    private String publicToken;

    /**
     * Expiration timestamp for the customer-facing review link.
     */
    @Column(name = "public_token_expires_at")
    private LocalDateTime publicTokenExpiresAt;

    /**
     * Timestamp for the first time a customer opens the public quote review page.
     */
    @Column(name = "customer_viewed_at")
    private LocalDateTime customerViewedAt;

    /**
     * Timestamp for customer approval.
     */
    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    /**
     * Timestamp for customer decline.
     */
    @Column(name = "declined_at")
    private LocalDateTime declinedAt;

    /**
     * Optional customer note submitted when approving or declining.
     */
    @Column(name = "customer_decision_note")
    private String customerDecisionNote;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected Quote() {
        // Required by JPA.
    }

    public Quote(
            Project project,
            String title,
            String description,
            BigDecimal estimatedLaborCost,
            BigDecimal estimatedMaterialCost,
            BigDecimal additionalCosts,
            BigDecimal totalAmount,
            LocalDate validUntil
    ) {
        this.id = UUID.randomUUID();
        this.project = project;
        this.title = title;
        this.description = description;
        this.estimatedLaborCost = estimatedLaborCost;
        this.estimatedMaterialCost = estimatedMaterialCost;
        this.additionalCosts = additionalCosts;
        this.totalAmount = totalAmount;
        this.status = QuoteStatus.DRAFT;
        this.validUntil = validUntil;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public Project getProject() {
        return project;
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

    public QuoteStatus getStatus() {
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

    /**
     * Updates the quote status and refreshes updatedAt.
     *
     * Why:
     * - Quotes move through a business workflow.
     * - The enum prevents invalid status values.
     */
    public void updateStatus(QuoteStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Updates the quote total and refreshes updatedAt.
     *
     * Why:
     * - Quote totals should be controlled by backend business logic.
     * - When line items change, the quote total should be recalculated.
     */
    public void updateTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Creates or refreshes the public review token for a quote.
     *
     * Why:
     * - The admin needs a customer-facing link to share the quote.
     * - The link should expire after a controlled time window.
     */
    public void publishForCustomerReview(String publicToken, LocalDateTime publicTokenExpiresAt) {
        this.publicToken = publicToken;
        this.publicTokenExpiresAt = publicTokenExpiresAt;
        this.status = QuoteStatus.SENT;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Records the first time the customer views the public quote.
     *
     * Why:
     * - The admin can see whether the customer has opened the quote.
     */
    public void markViewedByCustomer() {
        if (this.customerViewedAt == null) {
            this.customerViewedAt = LocalDateTime.now();
            this.updatedAt = LocalDateTime.now();
        }
    }

    /**
     * Records customer approval.
     *
     * Why:
     * - Customer approval should update both the workflow status and decision timestamp.
     */
    public void approveByCustomer(String customerDecisionNote) {
        this.status = QuoteStatus.ACCEPTED;
        this.approvedAt = LocalDateTime.now();
        this.declinedAt = null;
        this.customerDecisionNote = customerDecisionNote;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Records customer decline.
     *
     * Why:
     * - Customer decline should update both the workflow status and decision timestamp.
     */
    public void declineByCustomer(String customerDecisionNote) {
        this.status = QuoteStatus.DECLINED;
        this.declinedAt = LocalDateTime.now();
        this.approvedAt = null;
        this.customerDecisionNote = customerDecisionNote;
        this.updatedAt = LocalDateTime.now();
    }

    /**
     * Marks the quote as expired.
     *
     * Why:
     * - Expired public quote links should not remain actionable.
     */
    public void expire() {
        this.status = QuoteStatus.EXPIRED;
        this.updatedAt = LocalDateTime.now();
    }
}