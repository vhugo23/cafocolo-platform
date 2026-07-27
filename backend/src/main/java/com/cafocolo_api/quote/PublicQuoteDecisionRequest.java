package com.cafocolo_api.quote;

import jakarta.validation.constraints.Size;

/**
 * Request body used when a customer approves or declines a public quote.
 *
 * Why this exists:
 * - Customers may want to leave a note with their decision.
 * - The note is optional, but should have a reasonable length limit.
 */
public class PublicQuoteDecisionRequest {

    @Size(max = 1000, message = "Decision note must be 1000 characters or fewer")
    private String customerDecisionNote;

    public String getCustomerDecisionNote() {
        return customerDecisionNote;
    }

    public void setCustomerDecisionNote(String customerDecisionNote) {
        this.customerDecisionNote = customerDecisionNote;
    }
}