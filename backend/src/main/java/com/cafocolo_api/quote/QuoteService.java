package com.cafocolo_api.quote;

import com.cafocolo_api.error.NotFoundException;
import com.cafocolo_api.project.Project;
import com.cafocolo_api.project.ProjectRepository;
import com.cafocolo_api.quotelineitem.QuoteLineItem;
import com.cafocolo_api.quotelineitem.QuoteLineItemRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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

    private static final int PUBLIC_TOKEN_EXPIRATION_DAYS = 30;
    private static final int MAX_TOKEN_GENERATION_ATTEMPTS = 5;

    private final QuoteRepository quoteRepository;
    private final ProjectRepository projectRepository;
    private final QuoteLineItemRepository quoteLineItemRepository;
    private final QuoteTokenGenerator quoteTokenGenerator;
    private final String publicFrontendUrl;

    public QuoteService(
            QuoteRepository quoteRepository,
            ProjectRepository projectRepository,
            QuoteLineItemRepository quoteLineItemRepository,
            QuoteTokenGenerator quoteTokenGenerator,
            @Value("${cafocolo.public-frontend-url:http://localhost:3000}") String publicFrontendUrl
    ) {
        this.quoteRepository = quoteRepository;
        this.projectRepository = projectRepository;
        this.quoteLineItemRepository = quoteLineItemRepository;
        this.quoteTokenGenerator = quoteTokenGenerator;
        this.publicFrontendUrl = publicFrontendUrl;
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

    /**
     * Generates a customer-facing public quote review link.
     *
     * Why:
     * - Admins need a shareable link for the customer.
     * - Customers should not need admin credentials to review a quote.
     * - The public link should be token-based and expire after a controlled period.
     */
    @Transactional
    public GeneratePublicQuoteLinkResponse generatePublicQuoteLink(UUID quoteId) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new NotFoundException("Quote not found: " + quoteId));

        String publicToken = generateUniquePublicToken();
        LocalDateTime expiresAt = LocalDateTime.now().plusDays(PUBLIC_TOKEN_EXPIRATION_DAYS);

        quote.publishForCustomerReview(publicToken, expiresAt);

        Quote savedQuote = quoteRepository.save(quote);

        String publicReviewUrl = buildPublicReviewUrl(savedQuote.getPublicToken());

        return new GeneratePublicQuoteLinkResponse(savedQuote, publicReviewUrl);
    }

    /**
     * Returns a public-safe quote response by public token.
     *
     * Why:
     * - Customer-facing quote review pages should not require admin login.
     * - The token must exist and must not be expired.
     * - The first customer view should be recorded for admin visibility.
     */
    @Transactional
    public PublicQuoteResponse getPublicQuoteByToken(String publicToken) {
        Quote quote = quoteRepository.findByPublicToken(publicToken)
                .orElseThrow(() -> new NotFoundException("Quote review link not found."));

        LocalDateTime now = LocalDateTime.now();

        if (quote.getPublicTokenExpiresAt() == null || quote.getPublicTokenExpiresAt().isBefore(now)) {
            quote.expire();
            throw new IllegalArgumentException("Quote review link has expired.");
        }

        quote.markViewedByCustomer();

        List<QuoteLineItem> lineItems = quoteLineItemRepository.findByQuoteId(quote.getId());

        return new PublicQuoteResponse(quote, lineItems);
    }

    private String generateUniquePublicToken() {
        for (int attempt = 0; attempt < MAX_TOKEN_GENERATION_ATTEMPTS; attempt++) {
            String publicToken = quoteTokenGenerator.generateToken();

            if (!quoteRepository.existsByPublicToken(publicToken)) {
                return publicToken;
            }
        }

        throw new IllegalStateException("Could not generate a unique public quote token.");
    }

    private String buildPublicReviewUrl(String publicToken) {
        String normalizedFrontendUrl = publicFrontendUrl.replaceAll("/+$", "");

        return normalizedFrontendUrl + "/quote-review/" + publicToken;
    }
}