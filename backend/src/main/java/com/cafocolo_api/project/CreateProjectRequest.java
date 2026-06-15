package com.cafocolo_api.project;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Request DTO for creating a project from an existing lead.
 *
 * Why this exists:
 * - The frontend should send only the fields needed to create a project.
 * - The lead ID will come from the URL, not from the JSON body.
 */
public class CreateProjectRequest {

    @NotBlank(message = "Project name is required")
    private String projectName;

    @NotBlank(message = "Project type is required")
    private String projectType;

    private String description;

    private BigDecimal estimatedBudget;

    private LocalDate startDate;

    private LocalDate targetCompletionDate;

    public String getProjectName() {
        return projectName;
    }

    public String getProjectType() {
        return projectType;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getEstimatedBudget() {
        return estimatedBudget;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getTargetCompletionDate() {
        return targetCompletionDate;
    }
}