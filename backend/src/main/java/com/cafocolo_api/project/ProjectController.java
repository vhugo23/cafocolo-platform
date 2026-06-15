package com.cafocolo_api.project;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller for project-related API endpoints.
 *
 * Why this exists:
 * - It exposes project operations over HTTP.
 * - The frontend will call these endpoints to create and view projects.
 */
@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Creates a project from an existing lead.
     *
     * Endpoint:
     * POST /api/v1/leads/{leadId}/project
     */
    @PostMapping("/api/v1/leads/{leadId}/project")
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectResponse createProjectFromLead(
            @PathVariable UUID leadId,
            @Valid @RequestBody CreateProjectRequest request
    ) {
        return projectService.createProjectFromLead(leadId, request);
    }

    /**
     * Returns all projects.
     *
     * Endpoint:
     * GET /api/v1/projects
     */
    @GetMapping("/api/v1/projects")
    public List<ProjectResponse> getAllProjects() {
        return projectService.getAllProjects();
    }

    /**
     * Returns one project by ID.
     *
     * Endpoint:
     * GET /api/v1/projects/{id}
     */
    @GetMapping("/api/v1/projects/{id}")
    public ProjectResponse getProjectById(@PathVariable UUID id) {
        return projectService.getProjectById(id);
    }
}