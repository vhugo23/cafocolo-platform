package com.cafocolo_api.project;

import com.cafocolo_api.lead.Lead;
import com.cafocolo_api.lead.LeadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Service layer for project business logic.
 *
 * Why this exists:
 * - The controller handles HTTP.
 * - The repository handles database operations.
 * - The service decides what should happen when creating or reading projects.
 */
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final LeadRepository leadRepository;

    public ProjectService(ProjectRepository projectRepository, LeadRepository leadRepository) {
        this.projectRepository = projectRepository;
        this.leadRepository = leadRepository;
    }

    /**
     * Creates a project from an existing lead.
     *
     * Why the lead ID comes from the URL:
     * - The project belongs to a specific lead.
     * - The URL makes that relationship explicit:
     *   POST /api/v1/leads/{leadId}/project
     */
    @Transactional
    public ProjectResponse createProjectFromLead(UUID leadId, CreateProjectRequest request) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new IllegalArgumentException("Lead not found: " + leadId));

        Project project = new Project(
                lead,
                request.getProjectName(),
                request.getProjectType(),
                request.getDescription(),
                request.getEstimatedBudget(),
                request.getStartDate(),
                request.getTargetCompletionDate()
        );

        Project savedProject = projectRepository.save(project);

        return new ProjectResponse(savedProject);
    }

    /**
     * Returns all projects.
     *
     * Why:
     * - The admin dashboard will need a project list.
     */
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(ProjectResponse::new)
                .toList();
    }

    /**
     * Returns one project by ID.
     *
     * Why:
     * - The admin dashboard will need a project detail page.
     */
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(UUID projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + projectId));

        return new ProjectResponse(project);
    }
}