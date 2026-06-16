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
}