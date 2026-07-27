package com.cafocolo_api.quote;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public controller for customer-facing quote review links.
 *
 * Why this exists:
 * - Customers should be able to review a quote from a secure public token.
 * - These endpoints do not require admin authentication.
 */
@RestController
public class PublicQuoteController {

    private final QuoteService quoteService;

    public PublicQuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    /**
     * Returns public-safe quote details for a customer review link.
     *
     * Endpoint:
     * GET /api/v1/public/quotes/{token}
     */
    @GetMapping("/api/v1/public/quotes/{token}")
    public PublicQuoteResponse getPublicQuoteByToken(@PathVariable String token) {
        return quoteService.getPublicQuoteByToken(token);
    }
}