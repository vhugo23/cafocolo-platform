package com.cafocolo_api.project;

/**
 * Allowed workflow statuses for a project.
 *
 * Why this exists:
 * - A project should only move through known business states.
 * - This prevents random strings from becoming project statuses.
 */
public enum ProjectStatus {
    PLANNING,
    IN_PROGRESS,
    ON_HOLD,
    COMPLETED,
    CANCELLED;

    /**
     * Converts incoming text into a ProjectStatus.
     *
     * Why:
     * - API clients send JSON text.
     * - This method normalizes that text before converting it to an enum.
     */
    public static ProjectStatus fromString(String value) {
        return ProjectStatus.valueOf(value.trim().toUpperCase());
    }
}