package com.cafocolo_api.lead;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Response DTO = the shape of the JSON we send back to the client.
 *
 * Why this exists:
 * - We do not return the raw Lead entity directly.
 * - Entities represent database structure.
 * - Response DTOs represent API output.
 * - This gives us control over what the outside world sees.
 */
public class LeadResponse {

    private UUID id;
    private UUID customerId;
    private String customerName;
    private String requestedService;
    private String projectDescription;
    private String location;
    private String status;
    private String source;
    private LocalDateTime createdAt;

    public LeadResponse(Lead lead) {
        this.id = lead.getId();
        this.customerId = lead.getCustomer().getId();
        this.customerName = lead.getCustomer().getFullName();
        this.requestedService = lead.getRequestedService();
        this.projectDescription = lead.getProjectDescription();
        this.location = lead.getLocation();
        this.status = lead.getStatus().name();
        this.source = lead.getSource();
        this.createdAt = lead.getCreatedAt();
    }

    public UUID getId() {
        return id;
    }

    public UUID getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
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

    public String getStatus() {
        return status;
    }

    public String getSource() {
        return source;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}