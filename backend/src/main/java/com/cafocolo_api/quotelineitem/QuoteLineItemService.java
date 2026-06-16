package com.cafocolo_api.quotelineitem;

import com.cafocolo_api.error.NotFoundException;
import com.cafocolo_api.quote.Quote;
import com.cafocolo_api.quote.QuoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import java.math.BigDecimal;

/**
 * Service layer for quote line item business logic.
 *
 * Why this exists:
 * - The controller handles HTTP.
 * - The repositories handle database access.
 * - The service coordinates creating and reading quote line items.
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
     */
    @Transactional
    public QuoteLineItemResponse createLineItem(UUID quoteId, CreateQuoteLineItemRequest request) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        // The backend owns the financial calculation.
        // This prevents the client from sending an incorrect line total.
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
}