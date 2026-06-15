package com.cafocolo_api.lead;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Controller layer = HTTP/API layer.
 *
 * Why this exists:
 * - This class exposes endpoints that outside clients can call.
 * - The future Next.js frontend will call this endpoint when someone submits
 *   a quote request form on the Cafocolo website.
 * - The controller should stay thin: receive request, call service, return response.
 */
@RestController
@RequestMapping("/api/v1/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    /**
     * POST /api/v1/leads
     *
     * @RequestBody tells Spring to convert incoming JSON into CreateLeadRequest.
     * @Valid tells Spring to enforce validation rules like @NotBlank.
     * @ResponseStatus tells Spring to return HTTP 201 Created when successful.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeadResponse createLead(@Valid @RequestBody CreateLeadRequest request) {
        return leadService.createLead(request);
    }

    /**
     * GET /api/v1/leads
     * 
     * Why this exists:
     * - This endpoint Lets us retrieve submitted leads.
     * - Later, the admin dashboard will call this to display quote requests.
     */
    @GetMapping
    public List<LeadResponse> getAllLeads() {
        return leadService.getAllLeads();
    }

    /**
     * PATCH /api/v1/leads/{id}/status
     * 
     * Why PATCH:
     * - We are partially updating the Lead.
     * - We are not replacing the whole Lead object.
     * 
     * @PathVariable reads the {id} from the URL.
     * @RequestBody reads the JSON body containing the new status.
     */
    @PatchMapping("/{id}/status")
    public LeadResponse updateLeadStatus(
        @PathVariable UUID id,
        @Valid @RequestBody UpdateLeadStatusRequest request
    ){
        return leadService.updateLeadStatus(id, request);
    }
}