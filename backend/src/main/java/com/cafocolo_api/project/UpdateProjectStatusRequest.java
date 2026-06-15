package com.cafocolo_api.project;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for updating a project's status
 * 
 * Why this exisys:
 * - Updating project status is a small, focused operation
 * - The client should only send the new status, not the entire project.
 */
public class UpdateProjectStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public String getStatus() {
        return status;
    }
}
