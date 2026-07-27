package com.cafocolo_api.quote;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Response returned when an admin generates a customer-facing quote review link.
 */
public class GeneratePublicQuoteLinkResponse {

    private UUID quoteId;
    private String publicReviewUrl;
    private LocalDateTime publicTokenExpiresAt;
    private String status;

    public GeneratePublicQuoteLinkResponse(Quote quote, String publicReviewUrl) {
        this.quoteId = quote.getId();
        this.publicReviewUrl = publicReviewUrl;
        this.publicTokenExpiresAt = quote.getPublicTokenExpiresAt();
        this.status = quote.getStatus().name();
    }

    public UUID getQuoteId() {
        return quoteId;
    }

    public String getPublicReviewUrl() {
        return publicReviewUrl;
    }

    public LocalDateTime getPublicTokenExpiresAt() {
        return publicTokenExpiresAt;
    }

    public String getStatus() {
        return status;
    }
}