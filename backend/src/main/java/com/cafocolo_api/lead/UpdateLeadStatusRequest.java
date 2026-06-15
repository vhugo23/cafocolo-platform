package com.cafocolo_api.lead;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for updating a Lead's status.
 * 
 * Why this exists:
 * - PATCH /api/v1/leads/{id}/status should only receive the new status.
 *  - We do not want clients sending the entire Lead object just to change one field.
 */
public class UpdateLeadStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public String getStatus(){
        return status;
    }
}