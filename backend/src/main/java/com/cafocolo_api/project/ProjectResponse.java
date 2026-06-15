package com.cafocolo_api.project;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Response DTO for project data sent back to the client.
 *
 * Why this exists:
 * - We avoid returning the raw Project entity directly.
 * - This gives us control over the API response shape.
 */
public class ProjectResponse {

    private UUID id;
    private UUID leadId;
    private String customerName;
    private String projectName;
    private String projectType;
    private String description;
    private String status;
    private BigDecimal estimatedBudget;
    private BigDecimal actualBudget;
    private LocalDate startDate;
    private LocalDate targetCompletionDate;
    private LocalDate completedDate;
    private LocalDateTime createdAt;

    public ProjectResponse(Project project) {
        this.id = project.getId();
        this.leadId = project.getLead().getId();
        this.customerName = project.getLead().getCustomer().getFullName();
        this.projectName = project.getProjectName();
        this.projectType = project.getProjectType();
        this.description = project.getDescription();
        this.status = project.getStatus();
        this.estimatedBudget = project.getEstimatedBudget();
        this.actualBudget = project.getActualBudget();
        this.startDate = project.getStartDate();
        this.targetCompletionDate = project.getTargetCompletionDate();
        this.completedDate = project.getCompletedDate();
        this.createdAt = project.getCreatedAt();
    }

    public UUID getId() {
        return id;
    }

    public UUID getLeadId() {
        return leadId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getProjectType() {
        return projectType;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public BigDecimal getEstimatedBudget() {
        return estimatedBudget;
    }

    public BigDecimal getActualBudget() {
        return actualBudget;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getTargetCompletionDate() {
        return targetCompletionDate;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}