package com.cafocolo_api.quotelineitem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Response DTO for quote line items.
 *
 * Why this exists:
 * - We avoid exposing the raw entity directly.
 * - The API response stays clean and stable.
 */
public class QuoteLineItemResponse {

    private UUID id;
    private UUID quoteId;
    private String itemName;
    private String description;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;
    private LocalDateTime createdAt;

    public QuoteLineItemResponse(QuoteLineItem item) {
        this.id = item.getId();
        this.quoteId = item.getQuote().getId();
        this.itemName = item.getItemName();
        this.description = item.getDescription();
        this.quantity = item.getQuantity();
        this.unitPrice = item.getUnitPrice();
        this.lineTotal = item.getLineTotal();
        this.createdAt = item.getCreatedAt();
    }

    public UUID getId() {
        return id;
    }

    public UUID getQuoteId() {
        return quoteId;
    }

    public String getItemName() {
        return itemName;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public BigDecimal getLineTotal() {
        return lineTotal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}