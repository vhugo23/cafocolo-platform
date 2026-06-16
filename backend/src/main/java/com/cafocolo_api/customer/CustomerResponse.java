package com.cafocolo_api.customer;

import java.util.UUID;

/**
 * Response DTO for customer data.
 *
 * Why this exists:
 * - We avoid returning the raw Customer entity directly.
 * - The API controls exactly what customer fields are exposed.
 */
public class CustomerResponse {

    private UUID id;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String city;

    public CustomerResponse(Customer customer) {
        this.id = customer.getId();
        this.fullName = customer.getFullName();
        this.phoneNumber = customer.getPhoneNumber();
        this.email = customer.getEmail();
        this.city = customer.getCity();
    }

    public UUID getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getCity() {
        return city;
    }
}