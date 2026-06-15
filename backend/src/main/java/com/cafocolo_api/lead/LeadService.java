package com.cafocolo_api.lead;

import com.cafocolo_api.customer.Customer;
import com.cafocolo_api.customer.CustomerRepository;
import com.cafocolo_api.error.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Service layer = business logic layer.
 *
 * Why this exists:
 * - Controllers handle HTTP requests and responses.
 * - Repositories handle database access.
 * - Services coordinate business actions and rules.
 */
@Service
public class LeadService {

    private final CustomerRepository customerRepository;
    private final LeadRepository leadRepository;

    /**
     * These are the only lead statuses currently allowed.
     *
     * Why this exists:
     * - It prevents invalid workflow states from entering the database.
     * - Later, we can replace this Set with a proper Java enum.
     */
    private static final Set<String> ALLOWED_STATUSES = Set.of(
            "NEW",
            "CONTACTED",
            "SITE_VISIT_SCHEDULED",
            "QUOTED",
            "ACCEPTED",
            "DECLINED"
    );

    public LeadService(CustomerRepository customerRepository, LeadRepository leadRepository) {
        this.customerRepository = customerRepository;
        this.leadRepository = leadRepository;
    }

    /**
     * Creates a customer and lead together.
     *
     * Why @Transactional:
     * - If customer creation succeeds but lead creation fails, everything rolls back.
     * - This prevents incomplete data.
     */
    @Transactional
    public LeadResponse createLead(CreateLeadRequest request) {
        Customer customer = new Customer(
                request.getFullName(),
                request.getPhoneNumber(),
                request.getEmail(),
                request.getCity()
        );

        Customer savedCustomer = customerRepository.save(customer);

        Lead lead = new Lead(
                savedCustomer,
                request.getRequestedService(),
                request.getProjectDescription(),
                request.getLocation()
        );

        Lead savedLead = leadRepository.save(lead);

        return new LeadResponse(savedLead);
    }

    /**
     * Returns all leads.
     *
     * Why:
     * - The future admin dashboard needs a list of incoming quote requests.
     */
    @Transactional(readOnly = true)
    public List<LeadResponse> getAllLeads() {
        return leadRepository.findAll()
                .stream()
                .map(LeadResponse::new)
                .toList();
    }

    /**
     * Returns one lead by ID.
     *
     * Why:
     * - The future admin dashboard needs a detail page for one selected lead.
     */
    @Transactional(readOnly = true)
    public LeadResponse getLeadById(UUID leadId) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new IllegalArgumentException("Lead not found: " + leadId));

        return new LeadResponse(lead);
    }

    /**
     * Updates the status of an existing lead.
     *
     * Why:
     * - A lead moves through a real business workflow.
     * - We validate the status so bad values do not enter the database.
     */
    @Transactional
    public LeadResponse updateLeadStatus(UUID leadId, UpdateLeadStatusRequest request) {
        String normalizedStatus = request.getStatus().trim().toUpperCase();

        if (!ALLOWED_STATUSES.contains(normalizedStatus)) {
            throw new IllegalArgumentException("Invalid lead status: " + request.getStatus());
        }

        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new IllegalArgumentException("Lead not found: " + leadId));

        lead.updateStatus(normalizedStatus);

        Lead savedLead = leadRepository.save(lead);

        return new LeadResponse(savedLead);
    }
}