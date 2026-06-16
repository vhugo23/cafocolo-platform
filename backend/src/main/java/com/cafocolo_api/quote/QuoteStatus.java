package com.cafocolo_api.quote;

/**
 * Allowed workflow statuses for a quote.
 *
 * Why this exists:
 * - A quote should only move through known business states.
 * - This prevents random strings from becoming quote statuses.
 */
public enum QuoteStatus {
    DRAFT,
    SENT,
    ACCEPTED,
    DECLINED,
    EXPIRED;

    /**
     * Converts incoming text into a QuoteStatus.
     *
     * Why:
     * - API clients send JSON text.
     * - This method normalizes that text before converting it to an enum.
     */
    public static QuoteStatus fromString(String value) {
        return QuoteStatus.valueOf(value.trim().toUpperCase());
    }
}