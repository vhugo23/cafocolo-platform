# Cafocolo Platform

Cafocolo Platform is a full-stack business operations system for a construction, renovation, and custom furniture business. The goal is to help the business manage customer inquiries, leads, projects, project notes, quotes, and itemized estimates in one place.

This project is being built as a real-world backend-first system, with the backend designed around practical business workflows before frontend integration.

---

## Current Status

Cafocolo Platform is currently a working full-stack MVP.

The project supports the main business workflow for a construction, renovation, and custom furniture business:

```text
Customer submits quote request
        ↓
Lead is created
        ↓
Admin reviews lead
        ↓
Admin creates project from lead
        ↓
Project is tracked with notes and status updates
        ↓
Quote is created for project
        ↓
Quote line items are added, edited, or deleted
        ↓
Quote total is recalculated from line items
```

The backend operations core is functional, and the frontend admin workflow is connected to the backend API.

Completed backend workflows:

* Customer intake
* Lead tracking
* Lead status updates
* Project creation from leads
* Project tracking
* Project status updates
* Project notes
* Quote creation
* Quote status updates
* Quote line item creation
* Quote line item editing
* Quote line item deletion
* Backend-calculated quote line item totals
* Quote total recalculation from line items
* Customer relationship views
* Structured API error responses
* CORS configuration for local frontend integration

Completed frontend workflows:

* Public quote request form
* Admin dashboard overview
* Leads list
* Lead detail page
* Lead status updates
* Create project from lead
* Customers list
* Customer detail page
* Projects list
* Project detail page
* Project status updates
* Project note creation
* Quote creation
* Quote detail page
* Quote status updates
* Quote line item creation
* Quote line item editing
* Quote line item deletion
* Automatic quote total recalculation after quote item changes

Current technical cleanup completed:

* Reusable status badge component
* Reusable page header component
* Reusable card component
* Shared frontend API helper functions
* Shared formatting helpers for dates and currency

The project is not production-ready yet. The next major phase is admin authentication and deployment preparation.

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

### Frontend

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
* Edit quote line item
* Delete quote line item
* Backend calculates line total from quantity and unit price
* Quote total can be recalculated from current line items

```text
lineTotal = quantity × unitPrice
quoteTotal = sum(lineTotal)

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

## Repository Status

The backend currently builds successfully with Maven tests, and the latest backend changes are committed to GitHub.

## Full-Stack Status

Cafocolo Platform now has a working full-stack development flow.

The backend provides the business operations API using Spring Boot and PostgreSQL. The frontend provides an admin dashboard and public quote request experience using Next.js.

Current full-stack capabilities:

* Public quote request form
* Admin dashboard overview
* Leads list and lead detail pages
* Lead status updates from the frontend
* Projects list and project detail pages
* Project status updates from the frontend
* Project note creation from the frontend
* Quote creation from the frontend
* Quote detail page
* Quote status updates from the frontend
* Quote line item creation from the frontend
* Quote total recalculation from the frontend

---

## Frontend

The frontend is located in:

```text
frontend/
```

### Frontend Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* ESLint

### Frontend Routes

```text
/                 Dashboard overview
/leads            Leads list
/leads/[id]       Lead detail page
/projects         Projects list
/projects/[id]    Project detail page
/quotes/[id]      Quote detail page
/request-quote    Public quote request form
```

### Frontend Features

#### Dashboard

The dashboard shows a high-level overview of the business state:

* Total leads
* Open leads
* Active projects
* Recent leads
* Recent projects

#### Public Quote Request

The public request form allows a customer or operator to submit a new quote request.

Submitting the form calls:

```http
POST /api/v1/leads
```

The backend creates:

```text
Customer + Lead
```

The new lead then appears in the admin dashboard and leads table.

#### Lead Management

The frontend supports:

* Viewing all leads
* Opening a lead detail page
* Updating lead status

Lead status updates call:

```http
PATCH /api/v1/leads/{id}/status
```

#### Project Management

The frontend supports:

* Viewing all projects
* Opening a project detail page
* Updating project status
* Adding project notes
* Viewing project notes
* Creating quotes for a project

Project status updates call:

```http
PATCH /api/v1/projects/{id}/status
```

Project notes call:

```http
POST /api/v1/projects/{projectId}/notes
GET /api/v1/projects/{projectId}/notes
```

#### Quote Management

The frontend supports:

* Creating quotes from a project page
* Viewing quote details
* Updating quote status
* Adding quote line items
* Recalculating quote totals

Quote creation calls:

```http
POST /api/v1/projects/{projectId}/quotes
```

Quote status updates call:

```http
PATCH /api/v1/quotes/{id}/status
```

Quote line items call:

```http
POST /api/v1/quotes/{quoteId}/items
GET /api/v1/quotes/{quoteId}/items
```

Quote total recalculation calls:

```http
PATCH /api/v1/quotes/{id}/recalculate-total
```

---

## Running the Full Stack Locally

### 1. Start the backend

From the backend directory:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

### 2. Start the frontend

From the frontend directory:

```powershell
cd frontend
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

### 3. Frontend environment variable

The frontend uses this local environment file:

```text
frontend/.env.local
```

Required value:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

This tells the Next.js frontend where the Spring Boot backend is running.

---

## Quality Checks

### Backend

From the backend directory:

```powershell
.\mvnw.cmd test
```

Expected result:

```text
BUILD SUCCESS
```

### Frontend

From the frontend directory:

```powershell
npm run lint
npm run build
```

Expected result:

```text
Compiled successfully
```

The frontend production build currently includes these routes:

```text
/
/leads
/leads/[id]
/projects
/projects/[id]
/quotes/[id]
/request-quote
```

---

## Current Development Phase

The project has moved from backend-first development into a working full-stack MVP.

Completed phase:

```text
Backend operations core
Frontend admin dashboard foundation
Public quote request flow
Frontend read/write integration with backend APIs
Lead-to-project workflow
Quote line item management
Reusable frontend UI components
```

Current phase:

```text
Authentication and production-readiness preparation
```

Next major improvements:

* Add admin authentication
* Protect admin routes
* Keep public quote request open
* Add production environment configuration
* Prepare backend deployment
* Prepare frontend deployment
* Add database hosting configuration
* Improve responsive layout
* Add automated frontend tests
* Add backend service/controller tests
* Create portfolio case study with screenshots and architecture diagrams

Near-term product improvements after authentication:

* Add quote PDF export
* Add project photo/file attachments
* Add customer search and filtering
* Add lead/project filtering by status
* Add quote approval workflow
* Add dashboard analytics
