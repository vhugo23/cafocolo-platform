package com.cafocolo_api.error;

import java.time.LocalDateTime;

/**
 * Standard error response returned by the API.
 *
 * Why this exists:
 * - Without this, errors may return inconsistent or messy responses.
 * - A frontend needs predictable error fields to display useful messages.
 */
public class ApiErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ApiErrorResponse(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
}