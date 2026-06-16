package com.cafocolo_api.customer;

import org.springframework.web.bind.annotation.*;

import com.cafocolo_api.lead.LeadResponse;
import com.cafocolo_api.project.ProjectResponse;

import java.util.List;
import java.util.UUID;

/**
 * Controller for customer API endpoints.
 *
 * Why this exists:
 * - It exposes customer data over HTTP.
 * - The frontend will use this for customer list and customer detail pages.
 */
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    /**
     * Returns all customers.
     *
     * Endpoint:
     * GET /api/v1/customers
     */
    @GetMapping
    public List<CustomerResponse> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    /**
     * Returns one customer by ID.
     *
     * Endpoint:
     * GET /api/v1/customers/{id}
     */
    @GetMapping("/{id}")
    public CustomerResponse getCustomerById(@PathVariable UUID id) {
        return customerService.getCustomerById(id);
    }
    /**
     * Returns all leads submitted by one customer.
     *
     * Endpoint:
     * GET /api/v1/customers/{id}/leads
     */
    @GetMapping("/{id}/leads")
    public List<LeadResponse> getLeadsForCustomer(@PathVariable UUID id) {
        return customerService.getLeadsForCustomer(id);
    }

    /**
     * Returns all projects connected to one customer.
     *
     * Endpoint:
     * GET /api/v1/customers/{id}/projects
     */
    @GetMapping("/{id}/projects")
    public List<ProjectResponse> getProjectsForCustomer(@PathVariable UUID id) {
        return customerService.getProjectsForCustomer(id);
    }
}