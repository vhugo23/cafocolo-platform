package com.cafocolo_api.projectnote;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller for project note endpoints.
 *
 * Why this exists:
 * - It exposes note operations over HTTP.
 * - The frontend will use these endpoints inside the project detail page.
 */
@RestController
@RequestMapping("/api/v1/projects/{projectId}/notes")
public class ProjectNoteController {

    private final ProjectNoteService projectNoteService;

    public ProjectNoteController(ProjectNoteService projectNoteService) {
        this.projectNoteService = projectNoteService;
    }

    /**
     * Creates a note for one project.
     *
     * Endpoint:
     * POST /api/v1/projects/{projectId}/notes
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectNoteResponse createNote(
            @PathVariable UUID projectId,
            @Valid @RequestBody CreateProjectNoteRequest request
    ) {
        return projectNoteService.createNote(projectId, request);
    }

    /**
     * Returns notes for one project.
     *
     * Endpoint:
     * GET /api/v1/projects/{projectId}/notes
     */
    @GetMapping
    public List<ProjectNoteResponse> getNotesForProject(@PathVariable UUID projectId) {
        return projectNoteService.getNotesForProject(projectId);
    }
}