package com.cafocolo_api.projectnote;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Response DTO for project notes.
 *
 * Why this exists:
 * - We avoid exposing the raw entity directly.
 * - The API response stays stable even if the database entity changes later.
 */
public class ProjectNoteResponse {

    private UUID id;
    private UUID projectId;
    private String noteText;
    private String createdBy;
    private LocalDateTime createdAt;

    public ProjectNoteResponse(ProjectNote note) {
        this.id = note.getId();
        this.projectId = note.getProject().getId();
        this.noteText = note.getNoteText();
        this.createdBy = note.getCreatedBy();
        this.createdAt = note.getCreatedAt();
    }

    public UUID getId() {
        return id;
    }

    public UUID getProjectId() {
        return projectId;
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
}