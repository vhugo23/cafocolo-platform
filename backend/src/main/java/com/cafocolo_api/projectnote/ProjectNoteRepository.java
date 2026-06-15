package com.cafocolo_api.projectnote;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

/**
 * Repository for project note database operations.
 *
 * Why this exists:
 * - Spring Data JPA gives us basic database methods automatically.
 * - findByProjectId lets us fetch notes for one specific project.
 */
public interface ProjectNoteRepository extends JpaRepository<ProjectNote, UUID> {

    List<ProjectNote> findByProjectId(UUID projectId);
}