package com.cafocolo_api.lead;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO = Data Transfer Object
 * 
 * This class represents the JSON body that a client sends when creatig a lead.
 * We use a DTO instead of exposing the Lead entity directly because the API input
 * does not match  the database model exactly
 * 
 * Example:
 * {
 *   "fullName": "Test Customer",
 *   "phoneNumber": "+244 900 000 000",
 *   "requestedService": "Planned kitchen"
 * }
 */

public class CreateLeadRequest {

    // The customer's name is required because every lead must belong to a real person
    @NotBlank(message = "Full name is required")
    private String fullName;

    // The phone numer is required because Cafocolo usually communicates through phone/ WhatsApp
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    // Email is optional because many customers may only use phone/WhatsApp.
    private String email;

    // City is optional fornow, but useful for filtering and future logistics planning.
    private String city;

    // This is required because the business nedds to know what the customer wants.
    @NotBlank(message = "Requested service is required")
    private String requestedService;

    // Optional extra context from the customer.
    private String projectDescription;

    // Optional project location, useful for site visits and transportation planninh.
    private String location;

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

    public String getRequestedService() {
        return requestedService;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public String getLocation() {
        return location;
    }
}