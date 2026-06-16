package com.cafocolo_api.quote;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Request DTO for creating a quote for a project.
 *
 * Why this exists:
 * - The frontend sends only the fields needed to create a quote.
 * - The project ID comes from the URL, not from the JSON body.
 */
public class CreateQuoteRequest {

    @NotBlank(message = "Quote title is required")
    private String title;

    private String description;

    private BigDecimal estimatedLaborCost;

    private BigDecimal estimatedMaterialCost;

    private BigDecimal additionalCosts;

    @NotNull(message = "Total amount is required")
    private BigDecimal totalAmount;

    private LocalDate validUntil;

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

    public LocalDate getValidUntil() {
        return validUntil;
    }
}