package com.cafocolo_api.lead;

import com.cafocolo_api.customer.Customer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "requested_service", nullable = false, length = 150)
    private String requestedService;

    @Column(name = "project_description")
    private String projectDescription;

    @Column(length = 150)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private LeadStatus status;

    @Column(length = 100)
    private String source;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    protected Lead() {
    }

    public Lead(Customer customer, String requestedService, String projectDescription, String location) {
        this.id = UUID.randomUUID();
        this.customer = customer;
        this.requestedService = requestedService;
        this.projectDescription = projectDescription;
        this.location = location;
        this.status = LeadStatus.NEW;
        this.source = "WEBSITE";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
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

    public LeadStatus getStatus() {
        return status;
    }

    public String getSource() {
        return source;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    /**
     * Updates the lead status and refreshes updatedAt.
     *
     * Why this accepts LeadStatus instead of String:
     * - The caller must provide a valid workflow status.
     * - Java now protects us from invalid status values.
     */
    public void updateStatus(LeadStatus status){
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }
}