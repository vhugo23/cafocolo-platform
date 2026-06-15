package com.cafocolo_api.projectnote;

import com.cafocolo_api.project.Project;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entity representing a note attached to a project.
 *
 * Why this exists:
 * - Projects need a running history of updates, decisions, and reminders.
 * - Each note belongs to one project.
 */
@Entity
@Table(name = "project_notes")
public class ProjectNote {

    @Id
    private UUID id;

    /**
     * Many notes can belong to one project.
     *
     * This maps to project_id in the project_notes table.
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "note_text", nullable = false)
    private String noteText;

    @Column(name = "created_by", length = 150)
    private String createdBy;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected ProjectNote() {
        // Required by JPA.
    }

    public ProjectNote(Project project, String noteText, String createdBy) {
        this.id = UUID.randomUUID();
        this.project = project;
        this.noteText = noteText;
        this.createdBy = createdBy;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public Project getProject() {
        return project;
    }

    public String getNoteText() {
        return noteText;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}