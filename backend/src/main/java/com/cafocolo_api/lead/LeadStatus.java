package com.cafocolo_api.lead;

/**
 * Allowed workflow statuses for a lead.
 *
 * Why this exists:
 * - A lead should only be in one of these known states.
 * - Using an enum is safer than storing arbitrary strings in Java.
 */
public enum LeadStatus {
    NEW,
    CONTACTED,
    SITE_VISIT_SCHEDULED,
    QUOTED,
    ACCEPTED,
    DECLINED;

    /**
     * Converts incoming text into a LeadStatus.
     *
     * Why:
     * - API clients send JSON text like "contacted" or "CONTACTED".
     * - This method normalizes the text and converts it safely.
     */
    public static LeadStatus fromString(String value) {
        return LeadStatus.valueOf(value.trim().toUpperCase());
    }
}