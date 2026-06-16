package com.cafocolo_api.project;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

/**
 * Repository for Project database operations.
 *
 * Why this exists:
 * - Spring Data JPA gives us basic methods like save(), findAll(), and findById().
 * - findByLeadCustomerId lets us fetch projects connected to one customer through the lead.
 */
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByLeadCustomerId(UUID customerId);
}