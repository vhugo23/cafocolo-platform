package com.cafocolo_api.quotelineitem;

import com.cafocolo_api.error.NotFoundException;
import com.cafocolo_api.quote.Quote;
import com.cafocolo_api.quote.QuoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * Service layer for quote line item business logic.
 *
 * Why this exists:
 * - The controller handles HTTP.
 * - The repositories handle database access.
 * - The service coordinates quote line item business rules.
 */
@Service
public class QuoteLineItemService {

    private final QuoteLineItemRepository quoteLineItemRepository;
    private final QuoteRepository quoteRepository;

    public QuoteLineItemService(
            QuoteLineItemRepository quoteLineItemRepository,
            QuoteRepository quoteRepository
    ) {
        this.quoteLineItemRepository = quoteLineItemRepository;
        this.quoteRepository = quoteRepository;
    }

    /**
     * Creates one line item for an existing quote.
     *
     * Why:
     * - Line items should only exist under a real quote.
     * - We verify the quote exists before attaching the item.
     * - The backend owns the lineTotal calculation.
     */
    @Transactional
    public QuoteLineItemResponse createLineItem(UUID quoteId, CreateQuoteLineItemRequest request) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        BigDecimal lineTotal = request.getQuantity().multiply(request.getUnitPrice());

        QuoteLineItem item = new QuoteLineItem(
                quote,
                request.getItemName(),
                request.getDescription(),
                request.getQuantity(),
                request.getUnitPrice(),
                lineTotal
        );

        QuoteLineItem savedItem = quoteLineItemRepository.save(item);

        return new QuoteLineItemResponse(savedItem);
    }

    /**
     * Returns all line items for one quote.
     *
     * Why:
     * - The quote detail page should show the itemized estimate.
     */
    @Transactional(readOnly = true)
    public List<QuoteLineItemResponse> getLineItemsForQuote(UUID quoteId) {
        boolean quoteExists = quoteRepository.existsById(quoteId);

        if (!quoteExists) {
            throw new NotFoundException("Quote not found: " + quoteId);
        }

        return quoteLineItemRepository.findByQuoteId(quoteId)
                .stream()
                .map(QuoteLineItemResponse::new)
                .toList();
    }

    /**
     * Updates one quote line item.
     *
     * Why:
     * - Admins often need to correct quantity, price, description, or name.
     * - The backend recalculates lineTotal so financial math stays trusted.
     * - We verify that the item belongs to the quote from the URL.
     */
    @Transactional
    public QuoteLineItemResponse updateQuoteLineItem(
            UUID quoteId,
            UUID itemId,
            UpdateQuoteLineItemRequest request
    ) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        QuoteLineItem item = quoteLineItemRepository.findById(itemId)
                .orElseThrow(() -> new NotFoundException("Quote line item not found: " + itemId));

        ensureItemBelongsToQuote(item, quote);

        BigDecimal lineTotal = request.getQuantity().multiply(request.getUnitPrice());

        /*
         * These setters update the existing database row instead of creating
         * a new line item. JPA will persist the changes when the transaction commits.
         */
        item.setItemName(request.getItemName());
        item.setDescription(request.getDescription());
        item.setQuantity(request.getQuantity());
        item.setUnitPrice(request.getUnitPrice());
        item.setLineTotal(lineTotal);

        return new QuoteLineItemResponse(item);
    }

    /**
     * Deletes one quote line item.
     *
     * Why:
     * - A quote line item belongs to a specific quote.
     * - We should not delete an item only by itemId without checking quote ownership.
     */
    @Transactional
    public void deleteQuoteLineItem(UUID quoteId, UUID itemId) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        QuoteLineItem item = quoteLineItemRepository.findById(itemId)
                .orElseThrow(() -> new NotFoundException("Quote line item not found: " + itemId));

        ensureItemBelongsToQuote(item, quote);

        quoteLineItemRepository.delete(item);
    }

    /**
     * Shared ownership check.
     *
     * Why:
     * - Both update and delete need the same safety check.
     * - Keeping it in one private method avoids duplicating the rule.
     */
    private void ensureItemBelongsToQuote(QuoteLineItem item, Quote quote) {
        if (!item.getQuote().getId().equals(quote.getId())) {
            throw new NotFoundException(
                    "Quote line item not found for quote: " + quote.getId()
            );
        }
    }
}