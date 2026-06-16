package com.cafocolo_api.quote;

import com.cafocolo_api.error.NotFoundException;
import com.cafocolo_api.project.Project;
import com.cafocolo_api.project.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cafocolo_api.quotelineitem.QuoteLineItem;
import com.cafocolo_api.quotelineitem.QuoteLineItemRepository;

import java.util.List;
import java.util.UUID;
import java.math.BigDecimal;

/**
 * Service layer for quote business logic.
 *
 * Why this exists:
 * - The controller handles HTTP.
 * - The repositories handle database access.
 * - The service coordinates quote creation, retrieval, and workflow updates.
 */
@Service
public class QuoteService {

    private final QuoteRepository quoteRepository;
    private final ProjectRepository projectRepository;
    private final QuoteLineItemRepository quoteLineItemRepository;

    public QuoteService(
            QuoteRepository quoteRepository,
            ProjectRepository projectRepository,
            QuoteLineItemRepository quoteLineItemRepository
    ) {
        this.quoteRepository = quoteRepository;
        this.projectRepository = projectRepository;
        this.quoteLineItemRepository = quoteLineItemRepository;
    }

    /**
     * Creates a quote for an existing project.
     *
     * Why:
     * - Quotes should belong to real projects.
     * - We verify the project exists before attaching a quote to it.
     */
    @Transactional
    public QuoteResponse createQuote(UUID projectId, CreateQuoteRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found: " + projectId));

        Quote quote = new Quote(
                project,
                request.getTitle(),
                request.getDescription(),
                request.getEstimatedLaborCost(),
                request.getEstimatedMaterialCost(),
                request.getAdditionalCosts(),
                request.getTotalAmount(),
                request.getValidUntil()
        );

        Quote savedQuote = quoteRepository.save(quote);

        return new QuoteResponse(savedQuote);
    }

    /**
     * Returns all quotes for one project.
     *
     * Why:
     * - A project may have one or more estimates over time.
     */
    @Transactional(readOnly = true)
    public List<QuoteResponse> getQuotesForProject(UUID projectId) {
        boolean projectExists = projectRepository.existsById(projectId);

        if (!projectExists) {
            throw new NotFoundException("Project not found: " + projectId);
        }

        return quoteRepository.findByProjectId(projectId)
                .stream()
                .map(QuoteResponse::new)
                .toList();
    }

    /**
     * Returns one quote by ID.
     *
     * Why:
     * - The frontend may need a quote detail page.
     */
    @Transactional(readOnly = true)
    public QuoteResponse getQuoteById(UUID quoteId) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        return new QuoteResponse(quote);
    }

    /**
     * Updates the quote status.
     *
     * Why:
     * - Quotes move through a workflow: DRAFT, SENT, ACCEPTED, DECLINED, EXPIRED.
     * - QuoteStatus enum protects us from invalid workflow states.
     */
    @Transactional
    public QuoteResponse updateQuoteStatus(UUID quoteId, UpdateQuoteStatusRequest request) {
        QuoteStatus newStatus;

        try {
            newStatus = QuoteStatus.fromString(request.getStatus());
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("Invalid quote status: " + request.getStatus());
        }

        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        quote.updateStatus(newStatus);

        Quote savedQuote = quoteRepository.save(quote);

        return new QuoteResponse(savedQuote);
    }
    /**
     * Recalculates quote totalAmount from its line items.
     *
     * Why:
     * - The quote total should match the sum of its itemized estimate.
     * - This prevents the summary total from drifting away from the line items.
     */
    @Transactional
    public QuoteResponse recalculateQuoteTotal(UUID quoteId) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        BigDecimal recalculatedTotal = quoteLineItemRepository.findByQuoteId(quoteId)
                .stream()
                .map(QuoteLineItem::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        quote.updateTotalAmount(recalculatedTotal);

        Quote savedQuote = quoteRepository.save(quote);

        return new QuoteResponse(savedQuote);
    }
}