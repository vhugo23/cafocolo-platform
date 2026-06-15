package com.cafocolo_api.lead;

import com.cafocolo_api.customer.Customer;
import com.cafocolo_api.customer.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Service layer = business logic layer.
 * 
 * The controller will receive HTTP requests.
 * The repositories will talk to the database.
 * This service decides what needs to happen when a new lead is created.
 */
@Service
public class LeadService {

    private final CustomerRepository customerRepository;
    private final LeadRepository leadRepository;

    /**
     * These are the only lead statuses we allow right now.
     * 
     * Why this exists:
     * - Without a rule like this, someone could send invalid statuses like "banana"
     * - This keeps the lead workflow predictable.
     * - Later, we can replace this with a proper Java enum
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
     * Creates a new lead from an incoming request.
     *
     * @Transactional means this method is treated as one database transaction.
     * If saving the customer works but saving the lead fails, the customer save is rolled back.
     * That prevents incomplete data.
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
     * Returns all leads currently stored in the database.
     * 
     * Why this exists:
     * - The admin dashboard will need to show incoming quote requests.
     * - We convert each Lead entity to a LeadResponse DTO so the API response stays clean.
     */
    @Transactional(readOnly = true)
    public List<LeadResponse> getAllLeads(){
        return leadRepository.findAll()
        .stream()
        .map(LeadResponse::new)
        .toList();
    }

    /**
     * Updates the status of an existing lead.
     *
     * Why this exists:
     * - A lead moves through a real business workflow.
     * - We validate the status before saving so bad values do not enter the database.
     * - If the lead ID does not exist, we fail clearly.
     */
    @Transactional
    public LeadResponse updateLeadStatus(UUID leadId, UpdateLeadStatusRequest request) {
        // Normalize the status so "contacted", " CONTACTED ", and "Contacted" become "CONTACTED".
        String normalizedStatus = request.getStatus().trim().toUpperCase();

        // Reject invalid statuses before touching the database.
        if (!ALLOWED_STATUSES.contains(normalizedStatus)) {
            throw new IllegalArgumentException("Invalid lead status: " + request.getStatus());
        }

        // Find the lead by ID. If it does not exist, throw a clear error.
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new IllegalArgumentException("Lead not found: " + leadId));

        // Update the lead status and refresh updatedAt.
        lead.updateStatus(normalizedStatus);

        // Save the updated lead and return a clean API response.
        Lead savedLead = leadRepository.save(lead);

        return new LeadResponse(savedLead);
    }
}