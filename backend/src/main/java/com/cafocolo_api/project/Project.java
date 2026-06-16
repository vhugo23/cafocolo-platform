package com.cafocolo_api.project;

import com.cafocolo_api.lead.Lead;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entity representing a confirmed customer project.
 *
 * Why this exists:
 * - A Lead is a potential job.
 * - A Project is confirmed work that the business needs to manage.
 * - This entity maps Java code to the "projects" table in PostgreSQL.
 */
@Entity
@Table(name = "projects")
public class Project {

    @Id
    private UUID id;

    /**
     * Many projects could theoretically come from leads,
     * but each project starts from one specific lead.
     *
     * This maps to the lead_id column in the projects table.
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "lead_id", nullable = false)
    private Lead lead;

    @Column(name = "project_name", nullable = false, length = 150)
    private String projectName;

    @Column(name = "project_type", nullable = false, length = 150)
    private String projectType;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ProjectStatus status;

    @Column(name = "estimated_budget")
    private BigDecimal estimatedBudget;

    @Column(name = "actual_budget")
    private BigDecimal actualBudget;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "target_completion_date")
    private LocalDate targetCompletionDate;

    @Column(name = "completed_date")
    private LocalDate completedDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected Project() {
        // Required by JPA.
    }

    public Project(
            Lead lead,
            String projectName,
            String projectType,
            String description,
            BigDecimal estimatedBudget,
            LocalDate startDate,
            LocalDate targetCompletionDate
    ) {
        this.id = UUID.randomUUID();
        this.lead = lead;
        this.projectName = projectName;
        this.projectType = projectType;
        this.description = description;
        this.status = ProjectStatus.PLANNING;
        this.estimatedBudget = estimatedBudget;
        this.actualBudget = null;
        this.startDate = startDate;
        this.targetCompletionDate = targetCompletionDate;
        this.completedDate = null;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public Lead getLead() {
        return lead;
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

    public ProjectStatus getStatus() {
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    /**
     * Updates the project status and refreshes updatedAt.
     *
     * Why this accepts ProjectStatus instead of String:
     * - The caller must provide a valid project workflow state.
     * - Java now protects the project from invalid status values.
     */
    public void updateStatus(ProjectStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }
}