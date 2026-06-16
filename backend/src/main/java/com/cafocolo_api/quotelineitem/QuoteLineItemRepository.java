package com.cafocolo_api.quotelineitem;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

/**
 * Repository for quote line item database operations.
 *
 * Why this exists:
 * - Spring Data JPA gives us basic methods like save(), findAll(), and findById().
 * - findByQuoteId lets us fetch all items for one quote.
 */
public interface QuoteLineItemRepository extends JpaRepository<QuoteLineItem, UUID> {

    List<QuoteLineItem> findByQuoteId(UUID quoteId);
}