package com.cafocolo_api.customer;

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

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
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
}