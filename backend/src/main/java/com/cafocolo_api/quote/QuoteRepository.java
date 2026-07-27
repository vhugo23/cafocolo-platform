package com.cafocolo_api.quote;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

/**
 * Repository for quote database operations.
 *
 * Why this exists:
 * - Spring Data JPA gives us basic methods automatically.
 * - findByProjectId lets us fetch quotes for one specific project.
 * - existsByPublicToken helps prevent duplicate customer review tokens.
 */
public interface QuoteRepository extends JpaRepository<Quote, UUID> {

    List<Quote> findByProjectId(UUID projectId);

    boolean existsByPublicToken(String publicToken);
}