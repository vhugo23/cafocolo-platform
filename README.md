# Cafocolo Platform

Cafocolo Platform is a full-stack business operations system for a construction, renovation, and custom furniture business. The goal is to help the business manage customer inquiries, leads, projects, project notes, quotes, and itemized estimates in one place.

This project is being built as a real-world backend-first system, with the backend designed around practical business workflows before frontend integration.

---

## Current Status

The backend operations core is functional.

Completed backend workflows:

* Customer intake
* Lead tracking
* Lead status updates
* Project creation from leads
* Project tracking
* Project notes
* Quote creation
* Quote status updates
* Quote line items
* Backend-calculated quote line item totals
* Quote total recalculation from line items
* Customer relationship views
* Structured API error responses

---

## Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* PostgreSQL
* Flyway
* Maven

### Database

* PostgreSQL 18
* Flyway-managed schema migrations

### Planned Frontend

* Next.js
* TypeScript
* Tailwind CSS

---

## Backend Architecture

The backend follows a layered structure:

```text
Controller → Service → Repository → Database
```

### Controllers

Controllers expose HTTP endpoints and receive API requests.

### Services

Services contain business logic, such as:

* Creating projects from leads
* Updating workflow statuses
* Recalculating quote totals
* Validating whether related records exist

### Repositories

Repositories use Spring Data JPA to interact with PostgreSQL.

### DTOs

Request and response DTOs are used instead of exposing database entities directly.

### Migrations

Flyway controls database schema changes through versioned SQL migration files.

---

## Core Business Flow

```text
Customer submits request
        ↓
Lead is created
        ↓
Lead is reviewed and status is updated
        ↓
Project is created from the lead
        ↓
Project is tracked with status updates and notes
        ↓
Quote is created for the project
        ↓
Quote line items are added
        ↓
Backend calculates line totals
        ↓
Quote total is recalculated from line items
        ↓
Quote is sent, accepted, declined, or expired
```

---

## Backend Features

### Customers

* List all customers
* Get customer by ID
* Get leads for a customer
* Get projects for a customer

### Leads

* Create lead
* List all leads
* Get lead by ID
* Update lead status

Allowed lead statuses:

```text
NEW
CONTACTED
SITE_VISIT_SCHEDULED
QUOTED
ACCEPTED
DECLINED
```

### Projects

* Create project from lead
* List all projects
* Get project by ID
* Update project status

Allowed project statuses:

```text
PLANNING
IN_PROGRESS
ON_HOLD
COMPLETED
CANCELLED
```

### Project Notes

* Add note to project
* List notes for project

### Quotes

* Create quote for project
* List quotes for project
* Get quote by ID
* Update quote status
* Recalculate quote total from line items

Allowed quote statuses:

```text
DRAFT
SENT
ACCEPTED
DECLINED
EXPIRED
```

### Quote Line Items

* Add itemized quote line item
* List quote line items
* Backend calculates line total from quantity and unit price

```text
lineTotal = quantity × unitPrice
```

---

## API Documentation

Backend API documentation is available at:

```text
backend/API.md
```

This file includes endpoint paths, request body examples, workflow statuses, and error response formats.

---

## Database Migrations

Flyway migrations are located in:

```text
backend/src/main/resources/db/migration
```

Current migrations:

```text
V1__create_customers_and_leads.sql
V2__create_projects_table.sql
V3__create_project_notes_table.sql
V4__create_quotes_table.sql
V5__create_quote_line_items_table.sql
```

---

## Running the Backend Locally

### 1. Start PostgreSQL

Make sure PostgreSQL is running locally.

Expected local database:

```text
Database: cafocolo
Username: postgres
Password: postgres
Port: 5432
```

### 2. Run the backend

From the backend directory:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 3. Test the backend

From the backend directory:

```powershell
.\mvnw.cmd test
```

Expected result:

```text
BUILD SUCCESS
```

---

## Health Check

```http
GET /api/v1/health
```

Expected purpose:

Confirms the backend is running.

---

## Error Handling

The backend returns structured error responses.

Example bad request:

```json
{
  "timestamp": "2026-06-16T07:54:32.206247",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid quote status: PAID",
  "path": "/api/v1/quotes/{id}/status"
}
```

Example not found:

```json
{
  "timestamp": "2026-06-16T07:54:32.206247",
  "status": 404,
  "error": "Not Found",
  "message": "Quote not found: 11111111-1111-1111-1111-111111111111",
  "path": "/api/v1/quotes/11111111-1111-1111-1111-111111111111"
}
```

---

## Current Development Focus

The backend operations core is in place. The next major phase is frontend integration.

Planned frontend work:

* Admin dashboard layout
* Lead list and lead detail pages
* Customer list and customer detail pages
* Project list and project detail pages
* Project notes UI
* Quote and quote line item UI
* API client layer for connecting Next.js to Spring Boot

---

## Repository Status

The backend currently builds successfully with Maven tests, and the latest backend changes are committed to GitHub.
