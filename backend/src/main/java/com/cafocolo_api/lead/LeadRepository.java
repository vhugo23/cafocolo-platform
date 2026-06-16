package com.cafocolo_api.lead;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

/**
 * Repository for Lead database operations.
 *
 * Why this exists:
 * - Spring Data JPA gives us basic methods like save(), findAll(), and findById().
 * - findByCustomerId lets us fetch all leads submitted by one customer.
 */
public interface LeadRepository extends JpaRepository<Lead, UUID> {

    List<Lead> findByCustomerId(UUID customerId);
}