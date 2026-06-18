package com.cafocolo_api.quotelineitem;

import com.cafocolo_api.quote.Quote;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entity representing one item inside a quote.
 *
 * Why this exists:
 * - A quote total is useful, but customers need to see what the estimate includes.
 * - Line items make a quote more transparent and professional.
 */
@Entity
@Table(name = "quote_line_items")
public class QuoteLineItem {

    @Id
    private UUID id;

    /**
     * Many line items can belong to one quote.
     *
     * This maps to quote_id in the quote_line_items table.
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "quote_id", nullable = false)
    private Quote quote;

    @Column(name = "item_name", nullable = false, length = 150)
    private String itemName;

    @Column
    private String description;

    @Column(nullable = false)
    private BigDecimal quantity;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "line_total", nullable = false)
    private BigDecimal lineTotal;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected QuoteLineItem() {
        // Required by JPA.
    }

    public QuoteLineItem(
            Quote quote,
            String itemName,
            String description,
            BigDecimal quantity,
            BigDecimal unitPrice,
            BigDecimal lineTotal
    ) {
        this.id = UUID.randomUUID();
        this.quote = quote;
        this.itemName = itemName;
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.lineTotal = lineTotal;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public Quote getQuote() {
        return quote;
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
    public void setItemName(String itemName) {
        /*
        * Why this setter exists:
        * Admins may need to correct the item name after a quote line item is created.
        */
        this.itemName = itemName;
    }

    public void setDescription(String description) {
        /*
        * Why this setter exists:
        * Descriptions are editable because quote details often change during review.
        */
        this.description = description;
    }

    public void setQuantity(BigDecimal quantity) {
        /*
        * Why this setter exists:
        * Quantity affects the line total, so the service recalculates lineTotal
        * whenever quantity changes.
        */
        this.quantity = quantity;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        /*
        * Why this setter exists:
        * Unit price affects the line total, so the service recalculates lineTotal
        * whenever price changes.
        */
        this.unitPrice = unitPrice;
    }

    public void setLineTotal(BigDecimal lineTotal) {
        /*
        * Why this setter exists:
        * The backend owns this calculated value.
        * The frontend should never directly send lineTotal.
        */
        this.lineTotal = lineTotal;
}
}