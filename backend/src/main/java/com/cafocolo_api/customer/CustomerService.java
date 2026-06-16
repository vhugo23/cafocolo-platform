package com.cafocolo_api.customer;

import com.cafocolo_api.lead.LeadResponse;
import com.cafocolo_api.lead.LeadRepository;
import com.cafocolo_api.project.ProjectResponse;
import com.cafocolo_api.project.ProjectRepository;

import com.cafocolo_api.error.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Service layer for customer business logic.
 *
 * Why this exists:
 * - The controller handles HTTP.
 * - The repository handles database access.
 * - The service decides how customer data should be retrieved.
 */
@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final LeadRepository leadRepository;
    private final ProjectRepository projectRepository;

    public CustomerService(
            CustomerRepository customerRepository,
            LeadRepository leadRepository,
            ProjectRepository projectRepository
    ) {
        this.customerRepository = customerRepository;
        this.leadRepository = leadRepository;
        this.projectRepository = projectRepository;
    }
    /**
     * Returns all customers.
     *
     * Why:
     * - The admin dashboard will need a customer list.
     * - Customers can eventually have multiple leads and projects over time.
     */
    @Transactional(readOnly = true)
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(CustomerResponse::new)
                .toList();
    }

    /**
     * Returns one customer by ID.
     *
     * Why:
     * - The admin dashboard will need a customer detail page.
     */
    @Transactional(readOnly = true)
    public CustomerResponse getCustomerById(UUID customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException("Customer not found: " + customerId));

        return new CustomerResponse(customer);
    }
    /**
     * Returns all leads submitted by one customer.
     *
     * Why:
     * - A customer can submit multiple quote requests over time.
     * - The customer detail page should show that history.
     */
    @Transactional(readOnly = true)
    public List<LeadResponse> getLeadsForCustomer(UUID customerId) {
        boolean customerExists = customerRepository.existsById(customerId);

        if (!customerExists) {
            throw new NotFoundException("Customer not found: " + customerId);
        }

        return leadRepository.findByCustomerId(customerId)
                .stream()
                .map(LeadResponse::new)
                .toList();
    }

    /**
     * Returns all projects connected to one customer.
     *
     * Why:
     * - Projects are connected to customers through leads.
     * - This lets the customer detail page show completed/current work.
     */
    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjectsForCustomer(UUID customerId) {
        boolean customerExists = customerRepository.existsById(customerId);

        if (!customerExists) {
            throw new NotFoundException("Customer not found: " + customerId);
        }

        return projectRepository.findByLeadCustomerId(customerId)
                .stream()
                .map(ProjectResponse::new)
                .toList();
    }
}