package com.cafocolo_api.error;

/**
 * Exception used when a requested resource does not exist.
 *
 * Why this exists:
 * - Missing records should return 404 Not Found.
 * - Invalid user input should return 400 Bad Request.
 * - This lets our API distinguish between those two cases.
 */
public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}