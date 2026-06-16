package com.cafocolo_api.quotelineitem;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller for quote line item endpoints.
 *
 * Why this exists:
 * - It exposes itemized quote operations over HTTP.
 * - The frontend will use this inside the quote detail page.
 */
@RestController
@RequestMapping("/api/v1/quotes/{quoteId}/items")
public class QuoteLineItemController {

    private final QuoteLineItemService quoteLineItemService;

    public QuoteLineItemController(QuoteLineItemService quoteLineItemService) {
        this.quoteLineItemService = quoteLineItemService;
    }

    /**
     * Creates one line item under a quote.
     *
     * Endpoint:
     * POST /api/v1/quotes/{quoteId}/items
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuoteLineItemResponse createLineItem(
            @PathVariable UUID quoteId,
            @Valid @RequestBody CreateQuoteLineItemRequest request
    ) {
        return quoteLineItemService.createLineItem(quoteId, request);
    }

    /**
     * Returns all line items for a quote.
     *
     * Endpoint:
     * GET /api/v1/quotes/{quoteId}/items
     */
    @GetMapping
    public List<QuoteLineItemResponse> getLineItemsForQuote(@PathVariable UUID quoteId) {
        return quoteLineItemService.getLineItemsForQuote(quoteId);
    }
}