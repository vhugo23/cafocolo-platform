package com.cafocolo_api.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * DTO = Data Transfer Object.
 *
 * This class represents the JSON body that a client sends when creating a lead.
 *
 * Why we use a DTO:
 * - The API input does not need to match the database entity exactly.
 * - The public website should not control internal fields like ID, status,
 *   timestamps, customer relationship, or admin-only workflow data.
 * - Validation belongs at the boundary of the system, before bad data reaches
 *   the service layer or database.
 *
 * Example:
 * {
 *   "fullName": "Test Customer",
 *   "phoneNumber": "+244 900 000 000",
 *   "email": "customer@example.com",
 *   "city": "Luanda",
 *   "requestedService": "Kitchen cabinets",
 *   "projectDescription": "I need custom cabinets for my kitchen.",
 *   "location": "Luanda, Kilamba"
 * }
 */
public class CreateLeadRequest {

    /**
     * Required because every lead must belong to a real person.
     *
     * Size limit:
     * - Prevents accidental huge payloads.
     * - Keeps database records readable.
     * - Makes admin screens easier to display.
     */
    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 120, message = "Full name must be between 2 and 120 characters")
    private String fullName;

    /**
     * Required because Cafocolo usually communicates through phone or WhatsApp.
     *
     * Pattern:
     * - Allows realistic phone numbers such as +244 930 595 145.
     * - Allows spaces, parentheses, dots, and hyphens.
     * - Rejects random text like "call me maybe".
     */
    @NotBlank(message = "Phone number is required")
    @Size(min = 7, max = 25, message = "Phone number must be between 7 and 25 characters")
    @Pattern(
            regexp = "^\\+?[0-9\\s().-]+$",
            message = "Phone number can only contain digits, spaces, +, -, parentheses, or dots"
    )
    private String phoneNumber;

    /**
     * Optional because some customers may only use phone or WhatsApp.
     *
     * If provided, it must look like a real email address.
     */
    @Email(message = "Email must be a valid email address")
    @Size(max = 254, message = "Email must be 254 characters or fewer")
    private String email;

    /**
     * Optional for now, but useful for filtering, logistics, and future reporting.
     */
    @Size(max = 120, message = "City must be 120 characters or fewer")
    private String city;

    /**
     * Required because the business needs to know what the customer wants.
     */
    @NotBlank(message = "Requested service is required")
    @Size(min = 3, max = 160, message = "Requested service must be between 3 and 160 characters")
    private String requestedService;

    /**
     * Optional extra context from the customer.
     *
     * The max length prevents someone from submitting a massive payload into
     * the database or notification email.
     */
    @Size(max = 2000, message = "Project description must be 2000 characters or fewer")
    private String projectDescription;

    /**
     * Optional project location, useful for site visits and transportation planning.
     */
    @Size(max = 200, message = "Project location must be 200 characters or fewer")
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