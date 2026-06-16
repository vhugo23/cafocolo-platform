package com.cafocolo_api.customer;

import org.springframework.web.bind.annotation.*;

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
}