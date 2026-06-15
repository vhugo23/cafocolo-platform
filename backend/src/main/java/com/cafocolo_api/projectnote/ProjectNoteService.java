package com.cafocolo_api.projectnote;

import com.cafocolo_api.error.NotFoundException;
import com.cafocolo_api.project.Project;
import com.cafocolo_api.project.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Service layer for project note business logic.
 *
 * Why this exists:
 * - The controller handles HTTP.
 * - The repository handles database access.
 * - The service decides how notes are created and retrieved.
 */
@Service
public class ProjectNoteService {

    private final ProjectNoteRepository projectNoteRepository;
    private final ProjectRepository projectRepository;

    public ProjectNoteService(
            ProjectNoteRepository projectNoteRepository,
            ProjectRepository projectRepository
    ) {
        this.projectNoteRepository = projectNoteRepository;
        this.projectRepository = projectRepository;
    }

    /**
     * Creates a note for an existing project.
     *
     * Why:
     * - Notes should not exist without a real project.
     * - We first verify the project exists, then attach the note to it.
     */
    @Transactional
    public ProjectNoteResponse createNote(UUID projectId, CreateProjectNoteRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found: " + projectId));

        ProjectNote note = new ProjectNote(
                project,
                request.getNoteText(),
                request.getCreatedBy()
        );

        ProjectNote savedNote = projectNoteRepository.save(note);

        return new ProjectNoteResponse(savedNote);
    }

    /**
     * Returns all notes for a project.
     *
     * Why:
     * - The project detail page should show the history of updates and decisions.
     */
    @Transactional(readOnly = true)
    public List<ProjectNoteResponse> getNotesForProject(UUID projectId) {
        boolean projectExists = projectRepository.existsById(projectId);

        if (!projectExists) {
            throw new NotFoundException("Project not found: " + projectId);
        }

        return projectNoteRepository.findByProjectId(projectId)
                .stream()
                .map(ProjectNoteResponse::new)
                .toList();
    }
}