package com.cafocolo_api.project;

import com.cafocolo_api.lead.Lead;
import com.cafocolo_api.lead.LeadRepository;
import com.cafocolo_api.error.NotFoundException;
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
                .orElseThrow(() -> new NotFoundException("Lead not found: " + leadId));

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
                .orElseThrow(() -> new NotFoundException("Project not found: " + projectId));

        return new ProjectResponse(project);
    }

    /**
     * Updates the status of an existing project.
     *
     * Why:
     * - Projects move through a controlled workflow.
     * - ProjectStatus enum protects us from invalid workflow states.
     */
    @Transactional
    public ProjectResponse updateProjectStatus(UUID projectId, UpdateProjectStatusRequest request) {
        ProjectStatus newStatus;

        try {
            newStatus = ProjectStatus.fromString(request.getStatus());
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("Invalid project status: " + request.getStatus());
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found: " + projectId));

        project.updateStatus(newStatus);

        Project savedProject = projectRepository.save(project);

        return new ProjectResponse(savedProject);
    }
}