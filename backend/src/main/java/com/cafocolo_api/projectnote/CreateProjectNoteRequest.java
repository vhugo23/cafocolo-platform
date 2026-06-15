package com.cafocolo_api.projectnote;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for creating a project note.
 *
 * Why this exists:
 * - The frontend only needs to send the note text and optional author.
 * - The project ID comes from the URL.
 */
public class CreateProjectNoteRequest {

    @NotBlank(message = "Note text is required")
    private String noteText;

    private String createdBy;

    public String getNoteText() {
        return noteText;
    }

    public String getCreatedBy() {
        return createdBy;
    }
}