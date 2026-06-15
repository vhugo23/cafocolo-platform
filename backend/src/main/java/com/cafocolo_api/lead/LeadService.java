package com.cafocolo_api.lead;

import com.cafocolo_api.customer.Customer;
import com.cafocolo_api.customer.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}