# Cafocolo Backend API Reference

Base URL for local development:

```text
http://localhost:8080
```

## Health

### Check API health

```http
GET /api/v1/health
```

Purpose:

Checks whether the backend is running.

---

## Customers

### List all customers

```http
GET /api/v1/customers
```

Purpose:

Returns all customers stored in the system.

### Get customer by ID

```http
GET /api/v1/customers/{id}
```

Purpose:

Returns one customer by ID.

### Get leads for a customer

```http
GET /api/v1/customers/{id}/leads
```

Purpose:

Returns all leads submitted by one customer.

### Get projects for a customer

```http
GET /api/v1/customers/{id}/projects
```

Purpose:

Returns all projects connected to one customer through their leads.

---

## Leads

### Create a lead

```http
POST /api/v1/leads
```

Purpose:

Creates a new customer and lead from a public quote request.

Example request body:

```json
{
  "fullName": "Test Customer",
  "phoneNumber": "+244 900 000 000",
  "email": "customer@example.com",
  "city": "Luanda",
  "requestedService": "Planned kitchen",
  "projectDescription": "Customer wants a custom kitchen cabinet installation.",
  "location": "Luanda"
}
```

Default lead status:

```text
NEW
```

### List all leads

```http
GET /api/v1/leads
```

Purpose:

Returns all leads.

### Get lead by ID

```http
GET /api/v1/leads/{id}
```

Purpose:

Returns one lead by ID.

### Update lead status

```http
PATCH /api/v1/leads/{id}/status
```

Purpose:

Updates the workflow status of one lead.

Example request body:

```json
{
  "status": "CONTACTED"
}
```

Allowed statuses:

```text
NEW
CONTACTED
SITE_VISIT_SCHEDULED
QUOTED
ACCEPTED
DECLINED
```

---

## Projects

### Create project from lead

```http
POST /api/v1/leads/{leadId}/project
```

Purpose:

Creates a project from an existing lead.

Example request body:

```json
{
  "projectName": "Kitchen Cabinet Installation - Test Customer",
  "projectType": "Kitchen",
  "description": "Custom kitchen cabinet installation for customer in Luanda.",
  "estimatedBudget": 2500.00,
  "startDate": "2026-06-20",
  "targetCompletionDate": "2026-07-10"
}
```

Default project status:

```text
PLANNING
```

### List all projects

```http
GET /api/v1/projects
```

Purpose:

Returns all projects.

### Get project by ID

```http
GET /api/v1/projects/{id}
```

Purpose:

Returns one project by ID.

### Update project status

```http
PATCH /api/v1/projects/{id}/status
```

Purpose:

Updates the workflow status of one project.

Example request body:

```json
{
  "status": "IN_PROGRESS"
}
```

Allowed statuses:

```text
PLANNING
IN_PROGRESS
ON_HOLD
COMPLETED
CANCELLED
```

---

## Project Notes

### Create project note

```http
POST /api/v1/projects/{projectId}/notes
```

Purpose:

Adds a note to a project.

Example request body:

```json
{
  "noteText": "Customer approved the kitchen cabinet layout. Next step is confirming material pricing.",
  "createdBy": "Hugo"
}
```

### List notes for project

```http
GET /api/v1/projects/{projectId}/notes
```

Purpose:

Returns all notes attached to one project.

---

## Quotes

### Create quote for project

```http
POST /api/v1/projects/{projectId}/quotes
```

Purpose:

Creates a quote or estimate for one project.

Example request body:

```json
{
  "title": "Kitchen Cabinet Installation Estimate",
  "description": "Estimate for custom kitchen cabinet installation, including labor and materials.",
  "estimatedLaborCost": 900.00,
  "estimatedMaterialCost": 1400.00,
  "additionalCosts": 200.00,
  "totalAmount": 2500.00,
  "validUntil": "2026-07-15"
}
```

Default quote status:

```text
DRAFT
```

### List quotes for project

```http
GET /api/v1/projects/{projectId}/quotes
```

Purpose:

Returns all quotes attached to one project.

### Get quote by ID

```http
GET /api/v1/quotes/{id}
```

Purpose:

Returns one quote by ID.

### Update quote status

```http
PATCH /api/v1/quotes/{id}/status
```

Purpose:

Updates the workflow status of one quote.

Example request body:

```json
{
  "status": "SENT"
}
```

Allowed statuses:

```text
DRAFT
SENT
ACCEPTED
DECLINED
EXPIRED
```

### Recalculate quote total

```http
PATCH /api/v1/quotes/{id}/recalculate-total
```

Purpose:

Recalculates the quote total from all quote line items.

Calculation:

```text
quote.totalAmount = sum of all quote_line_items.lineTotal
```

---

## Quote Line Items

Quote line items represent the itemized costs inside a quote.

A quote can have multiple line items, such as materials, labor, delivery, installation, hardware, or other custom charges.

The backend is responsible for calculating each line item's total.

```text
lineTotal = quantity × unitPrice
```

The frontend should not send `lineTotal` directly. This keeps financial calculations controlled by the backend.

---

### Create Quote Line Item

```http
POST /api/v1/quotes/{quoteId}/items
```

Creates a new line item under an existing quote.

#### Request Body

```json
{
  "itemName": "Cabinet materials",
  "description": "Wood, hinges, handles, and finishing materials",
  "quantity": 1,
  "unitPrice": 1400.00
}
```

#### Response Body

```json
{
  "id": "87a934ed-ef12-4b16-a17d-c1da7a0660b9",
  "quoteId": "7df463b9-8670-4acd-9f0e-24b1636375a8",
  "itemName": "Cabinet materials",
  "description": "Wood, hinges, handles, and finishing materials",
  "quantity": 1,
  "unitPrice": 1400.00,
  "lineTotal": 1400.00,
  "createdAt": "2026-06-18T20:19:14.8608722"
}
```

#### Business Rules

* The quote must exist.
* `itemName` is required.
* `quantity` is required and must be greater than 0.
* `unitPrice` is required and cannot be negative.
* The backend calculates `lineTotal`.

---

### Get Quote Line Items

```http
GET /api/v1/quotes/{quoteId}/items
```

Returns all line items for a quote.

#### Response Body

```json
[
  {
    "id": "87a934ed-ef12-4b16-a17d-c1da7a0660b9",
    "quoteId": "7df463b9-8670-4acd-9f0e-24b1636375a8",
    "itemName": "Cabinet materials",
    "description": "Wood, hinges, handles, and finishing materials",
    "quantity": 1,
    "unitPrice": 1400.00,
    "lineTotal": 1400.00,
    "createdAt": "2026-06-18T20:19:14.8608722"
  }
]
```

#### Business Rules

* The quote must exist.
* Returns an empty list if the quote exists but has no line items.

---

### Update Quote Line Item

```http
PATCH /api/v1/quotes/{quoteId}/items/{itemId}
```

Updates an existing quote line item.

This is used when an admin needs to correct the item name, description, quantity, or unit price.

#### Request Body

```json
{
  "itemName": "Updated cabinet materials",
  "description": "Updated wood, hinges, handles, and finishing materials",
  "quantity": 2,
  "unitPrice": 750.00
}
```

#### Response Body

```json
{
  "id": "87a934ed-ef12-4b16-a17d-c1da7a0660b9",
  "quoteId": "7df463b9-8670-4acd-9f0e-24b1636375a8",
  "itemName": "Updated cabinet materials",
  "description": "Updated wood, hinges, handles, and finishing materials",
  "quantity": 2,
  "unitPrice": 750.00,
  "lineTotal": 1500.00,
  "createdAt": "2026-06-18T20:19:14.8608722"
}
```

#### Business Rules

* The quote must exist.
* The line item must exist.
* The line item must belong to the quote in the URL.
* `itemName` is required.
* `quantity` is required and must be greater than 0.
* `unitPrice` is required and cannot be negative.
* The backend recalculates `lineTotal`.

#### Why Both `quoteId` and `itemId` Are Used

The route includes both IDs:

```http
PATCH /api/v1/quotes/{quoteId}/items/{itemId}
```

This allows the backend to verify that the item being edited actually belongs to the quote being edited.

This prevents accidental updates to a line item from a different quote.

---

### Delete Quote Line Item

```http
DELETE /api/v1/quotes/{quoteId}/items/{itemId}
```

Deletes an existing quote line item.

#### Response

```http
204 No Content
```

#### Business Rules

* The quote must exist.
* The line item must exist.
* The line item must belong to the quote in the URL.
* The endpoint returns no response body after a successful delete.

#### Why Both `quoteId` and `itemId` Are Used

The route includes both IDs:

```http
DELETE /api/v1/quotes/{quoteId}/items/{itemId}
```

This allows the backend to verify quote ownership before deleting the item.

This prevents accidental deletion of an item from the wrong quote.

---

### Recalculate Quote Total

```http
PATCH /api/v1/quotes/{quoteId}/recalculate-total
```

Recalculates the quote total from its current line items.

The frontend currently calls this after:

* Adding a line item
* Editing a line item
* Deleting a line item

#### Response Body

```json
{
  "id": "7df463b9-8670-4acd-9f0e-24b1636375a8",
  "projectId": "b1a9e88a-cc58-43b0-9e10-d2211f117a4e",
  "projectName": "Kitchen Cabinet Installation - Test Customer",
  "customerName": "Test Customer",
  "title": "Kitchen Cabinet Installation Estimate",
  "description": "Estimate for custom kitchen cabinet installation.",
  "estimatedLaborCost": 900.00,
  "estimatedMaterialCost": 1400.00,
  "additionalCosts": 200.00,
  "totalAmount": 1500.00,
  "status": "DRAFT",
  "validUntil": "2026-07-15",
  "createdAt": "2026-06-18T20:19:14.8608722"
}
```

#### Business Rules

* The quote must exist.
* The backend sums the current line item totals.
* The quote total should stay aligned with the itemized estimate.


## Error Responses

The backend returns structured error responses.

### Validation or bad request error

Example:

```json
{
  "timestamp": "2026-06-16T07:54:32.206247",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid quote status: PAID",
  "path": "/api/v1/quotes/{id}/status"
}
```

Common causes:

```text
Invalid status
Missing required field
Invalid request body
```

### Not found error

Example:

```json
{
  "timestamp": "2026-06-16T07:54:32.206247",
  "status": 404,
  "error": "Not Found",
  "message": "Quote not found: 11111111-1111-1111-1111-111111111111",
  "path": "/api/v1/quotes/11111111-1111-1111-1111-111111111111"
}
```

Common causes:

```text
Customer not found
Lead not found
Project not found
Quote not found
```

---

## Current Local Testing IDs

These are example IDs from local development only. They may differ on another machine or database.

```text
Customer ID:
d6b6ad3d-24ff-4f96-9b09-8dc8b3b175d5

Lead ID:
bc25ca7f-268f-440d-a83b-9d94fe989d1c

Project ID:
b1a9e88a-cc58-43b0-9e10-d2211f117a4e

Quote ID:
7df463b9-8670-4acd-9f0e-24b1636375a8
```
