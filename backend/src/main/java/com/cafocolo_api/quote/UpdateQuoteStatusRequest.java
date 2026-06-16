package com.cafocolo_api.quote;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for updating a quote's status.
 *
 * Why this exists:
 * - Updating quote status is a focused operation.
 * - The client should only send the new status.
 */
public class UpdateQuoteStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public String getStatus() {
        return status;
    }
}