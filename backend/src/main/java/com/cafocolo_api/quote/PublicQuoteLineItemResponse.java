package com.cafocolo_api.quote;

import com.cafocolo_api.quotelineitem.QuoteLineItem;

import java.math.BigDecimal;

/**
 * Public-safe quote line item response for customer quote review pages.
 *
 * Why this exists:
 * - Customers need to see the estimate breakdown.
 * - The public API should expose only the fields needed for review.
 */
public class PublicQuoteLineItemResponse {

    private String itemName;
    private String description;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal lineTotal;

    public PublicQuoteLineItemResponse(QuoteLineItem lineItem) {
        this.itemName = lineItem.getItemName();
        this.description = lineItem.getDescription();
        this.quantity = lineItem.getQuantity();
        this.unitPrice = lineItem.getUnitPrice();
        this.lineTotal = lineItem.getLineTotal();
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
}