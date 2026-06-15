package com.cafocolo_api.project;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Repository for Project database operations.
 *
 * Why this exists:
 * - Spring Data JPA will automatically give us methods like save(), findAll(), and findById().
 * - We do not need to manually write SQL for basic project operations.
 */
public interface ProjectRepository extends JpaRepository<Project, UUID> {
}