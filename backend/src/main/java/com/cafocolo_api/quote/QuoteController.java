package com.cafocolo_api.quote;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller for quote-related API endpoints.
 *
 * Why this exists:
 * - It exposes quote operations over HTTP.
 * - The frontend will use these endpoints inside the project and quote pages.
 */
@RestController
public class QuoteController {

    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    /**
     * Creates a quote for one project.
     *
     * Endpoint:
     * POST /api/v1/projects/{projectId}/quotes
     */
    @PostMapping("/api/v1/projects/{projectId}/quotes")
    @ResponseStatus(HttpStatus.CREATED)
    public QuoteResponse createQuote(
            @PathVariable UUID projectId,
            @Valid @RequestBody CreateQuoteRequest request
    ) {
        return quoteService.createQuote(projectId, request);
    }

    /**
     * Returns all quotes for one project.
     *
     * Endpoint:
     * GET /api/v1/projects/{projectId}/quotes
     */
    @GetMapping("/api/v1/projects/{projectId}/quotes")
    public List<QuoteResponse> getQuotesForProject(@PathVariable UUID projectId) {
        return quoteService.getQuotesForProject(projectId);
    }

    /**
     * Returns one quote by ID.
     *
     * Endpoint:
     * GET /api/v1/quotes/{id}
     */
    @GetMapping("/api/v1/quotes/{id}")
    public QuoteResponse getQuoteById(@PathVariable UUID id) {
        return quoteService.getQuoteById(id);
    }

    /**
     * Updates quote status.
     *
     * Endpoint:
     * PATCH /api/v1/quotes/{id}/status
     */
    @PatchMapping("/api/v1/quotes/{id}/status")
    public QuoteResponse updateQuoteStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateQuoteStatusRequest request
    ) {
        return quoteService.updateQuoteStatus(id, request);
    }
    /**
     * Recalculates a quote total from its line items.
     *
     * Endpoint:
     * PATCH /api/v1/quotes/{id}/recalculate-total
     */
    @PatchMapping("/api/v1/quotes/{id}/recalculate-total")
    public QuoteResponse recalculateQuoteTotal(@PathVariable UUID id) {
        return quoteService.recalculateQuoteTotal(id);
    }
}