# Cafocolo Platform

Cafocolo Platform is a full-stack business operations system for a construction, renovation, and custom furniture business. The platform helps the business move from informal customer/project tracking into a structured digital workflow for managing customer inquiries, leads, customers, projects, project notes, quotes, and itemized estimates.

This project is being built as a real-world, backend-driven MVP with a public customer-facing website and a protected internal admin dashboard.

The main business workflow is:

```text
Customer visits public website
        ↓
Customer submits quote request
        ↓
Customer and lead records are created
        ↓
Admin logs into protected dashboard
        ↓
Admin reviews lead
        ↓
Admin creates project from lead
        ↓
Project is tracked with notes and status updates
        ↓
Quote is created for the project
        ↓
Quote line items are added, edited, or deleted
        ↓
Quote total is recalculated from line items
        ↓
Quote is sent, accepted, declined, or expired
```

---

## Current Status

Cafocolo Platform is currently a working secured full-stack MVP.

The application has two main sides:

1. **Public website**
   A visitor-facing website where potential customers can learn about Cafocolo, view service/portfolio-style content, understand the process, and submit quote requests.

2. **Admin dashboard**
   A protected internal dashboard where the business can manage leads, customers, projects, project notes, quotes, quote statuses, and quote line items.

The platform now supports the core end-to-end workflow:

```text
Public quote request
        ↓
Lead intake
        ↓
Admin login
        ↓
Lead review
        ↓
Project creation
        ↓
Project tracking
        ↓
Quote creation
        ↓
Line item management
        ↓
Quote total recalculation
```

The project is not production-deployed yet, but the local full-stack MVP is functional and secured at both the frontend route level and backend API level.

---

## Current MVP Capabilities

### Public Website

The public side of the application allows visitors to interact with Cafocolo without needing an account.

Current public features:

* Public homepage at `/`
* Public quote request form at `/request-quote`
* Data-driven services section
* Data-driven portfolio/work section
* Process overview section
* Public call-to-action links
* Public quote request submission
* Public quote requests create customer and lead records in the backend
* `/site` compatibility redirect to `/`

The public website is intentionally separated from the admin dashboard. Visitors should see the business website first, not the internal operations system.

### Admin Dashboard

The admin side is used by the business owner/operator to manage work after a customer submits a quote request.

Current admin features:

* Admin login page at `/admin/login`
* Protected admin dashboard at `/admin`
* Protected admin routes under `/admin/**`
* Admin logout button
* Lead list
* Lead detail page
* Lead status updates
* Customer list
* Customer detail page
* Customer relationship views
* Project list
* Project detail page
* Project creation from lead
* Project status updates
* Project note creation
* Quote creation from project
* Quote detail page
* Quote status updates
* Quote line item creation
* Quote line item editing
* Quote line item deletion
* Backend-calculated line totals
* Quote total recalculation from line items

### Authentication and Protection

The MVP now includes admin authentication and route protection.

Current security behavior:

* Admin login uses backend credentials configured through environment variables.
* Backend creates a JWT after successful login.
* JWT is stored in an HTTP-only cookie.
* Frontend middleware protects `/admin/**` routes.
* Backend Spring Security protects internal business APIs.
* Public quote request creation remains open.
* Direct unauthenticated access to protected business APIs is blocked.

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
* JJWT for JWT creation and validation

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router
* ESLint

### Database

* PostgreSQL 18
* Flyway-managed schema migrations

---

## Project Structure

```text
cafocolo-platform/
├── backend/
│   ├── src/main/java/com/cafocolo_api/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   └── CafocoloApiApplication.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/
│   ├── API.md
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend/
│   ├── app/
│   │   ├── admin/
│   │   ├── request-quote/
│   │   ├── site/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── middleware.ts
│   └── package.json
│
└── README.md
```

---

## Route Structure

### Public Routes

| Route            | Purpose                       |
| ---------------- | ----------------------------- |
| `/`              | Public Cafocolo homepage      |
| `/request-quote` | Public quote request form     |
| `/site`          | Compatibility redirect to `/` |

### Admin Routes

| Route                   | Purpose                               |
| ----------------------- | ------------------------------------- |
| `/admin/login`          | Admin login page                      |
| `/admin`                | Admin dashboard overview              |
| `/admin/leads`          | Lead list                             |
| `/admin/leads/[id]`     | Lead detail page                      |
| `/admin/customers`      | Customer list                         |
| `/admin/customers/[id]` | Customer detail page                  |
| `/admin/projects`       | Project list                          |
| `/admin/projects/[id]`  | Project detail page                   |
| `/admin/quotes/[id]`    | Quote detail and line item management |

### Legacy Redirects

Older internal routes were moved under `/admin`.

Legacy routes now redirect to their admin equivalents:

| Old Route         | New Route               |
| ----------------- | ----------------------- |
| `/leads`          | `/admin/leads`          |
| `/leads/[id]`     | `/admin/leads/[id]`     |
| `/customers`      | `/admin/customers`      |
| `/customers/[id]` | `/admin/customers/[id]` |
| `/projects`       | `/admin/projects`       |
| `/projects/[id]`  | `/admin/projects/[id]`  |
| `/quotes/[id]`    | `/admin/quotes/[id]`    |

---

## Authentication and Security Model

The admin area uses a backend-issued HTTP-only cookie.

Cookie name:

```text
cafocolo_admin_token
```

### Authentication Flow

```text
Admin submits login form
        ↓
Frontend sends credentials to backend
        ↓
Backend validates email/password
        ↓
Backend creates JWT
        ↓
Backend stores JWT in HTTP-only cookie
        ↓
Frontend redirects to /admin
        ↓
Frontend middleware checks cookie for /admin routes
        ↓
Backend validates cookie for protected business APIs
```

### Why HTTP-Only Cookies

The JWT is not manually stored in localStorage or sessionStorage. Instead, it is stored in an HTTP-only cookie.

This improves the MVP security model because:

* Browser JavaScript cannot directly read the token.
* The backend controls cookie creation and expiration.
* The browser automatically includes the cookie when credentials are enabled.
* Frontend middleware can check for the cookie server-side.
* Backend Spring Security remains the final authority for protected data.

### Local Development Credentials

Default local credentials:

```text
Email: admin@cafocolo.local
Password: admin123
```

These credentials are for local development only. Production credentials should be configured through environment variables.

### Protected vs Public Backend Access

Public endpoints:

```text
GET  /api/v1/health
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
POST /api/v1/leads
```

Protected endpoints:

```text
GET    /api/v1/leads/**
PATCH  /api/v1/leads/**
GET    /api/v1/customers/**
GET    /api/v1/projects/**
POST   /api/v1/projects/**
PATCH  /api/v1/projects/**
GET    /api/v1/quotes/**
POST   /api/v1/quotes/**
PATCH  /api/v1/quotes/**
DELETE /api/v1/quotes/**
```

The public quote request form remains open because visitors need to submit quote requests. Admin operations require a valid admin cookie.

---

## Environment Variables

### Frontend Environment

Create this file:

```text
frontend/.env.local
```

Required value:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

This tells the Next.js frontend where the Spring Boot backend is running.

### Backend Environment

The backend supports these environment variables:

```env
CAFOCOLO_ADMIN_EMAIL=admin@cafocolo.local
CAFOCOLO_ADMIN_PASSWORD=admin123
CAFOCOLO_JWT_SECRET=change-this-secret-to-a-long-random-value-at-least-32-chars
CAFOCOLO_COOKIE_SECURE=false
```

For production:

* Use a long random JWT secret.
* Do not use the default local password.
* Use production-safe admin credentials.
* Set secure cookie behavior based on HTTPS deployment.
* Keep secrets out of source control.

---

## Backend Architecture

The backend follows a layered architecture:

```text
Controller → Service → Repository → Database
```

### Controllers

Controllers expose HTTP endpoints and receive API requests.

Responsibilities:

* Accept request bodies
* Read path variables
* Return response DTOs
* Delegate business logic to services

### Services

Services contain business logic.

Examples:

* Creating a customer and lead from public quote request
* Updating lead statuses
* Creating a project from a lead
* Validating that a project belongs to an existing customer/lead
* Creating project notes
* Creating quotes
* Updating quote statuses
* Adding quote line items
* Editing quote line items
* Deleting quote line items
* Recalculating quote totals
* Validating JWT cookies

### Repositories

Repositories use Spring Data JPA to interact with PostgreSQL.

Responsibilities:

* Query records
* Save records
* Find records by ID
* Retrieve relationships such as customer leads and projects

### DTOs

DTOs are used instead of exposing entity objects directly.

Benefits:

* Cleaner API contracts
* Better control over response shape
* Safer separation between database structure and API output
* Easier frontend integration

### Security Layer

The security layer includes:

* Spring Security configuration
* CORS configuration
* Admin cookie authentication filter
* JWT service
* Auth controller

The backend validates the admin cookie before allowing access to protected business APIs.

---

## Backend Features

### Auth

Auth endpoints support the admin login/session/logout flow.

Features:

* Admin login
* Admin session check
* Admin logout
* JWT creation
* JWT validation
* HTTP-only cookie creation
* HTTP-only cookie expiration
* Protected API authentication

Endpoints:

```http
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

### Customers

Customer records are created when a public quote request is submitted.

Features:

* List all customers
* Get customer by ID
* Get leads for a customer
* Get projects for a customer

Endpoints:

```http
GET /api/v1/customers
GET /api/v1/customers/{id}
GET /api/v1/customers/{id}/leads
GET /api/v1/customers/{id}/projects
```

Authentication:

```text
Admin cookie required
```

### Leads

Leads represent customer inquiries or quote requests.

Features:

* Create lead from public quote request
* List all leads
* Get lead by ID
* Update lead status

Endpoints:

```http
POST  /api/v1/leads
GET   /api/v1/leads
GET   /api/v1/leads/{id}
PATCH /api/v1/leads/{id}/status
```

Authentication:

```text
POST /api/v1/leads is public.
All other lead endpoints require an admin cookie.
```

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

Projects represent confirmed or potential work created from a lead.

Features:

* Create project from lead
* List all projects
* Get project by ID
* Update project status

Endpoints:

```http
POST  /api/v1/leads/{leadId}/project
GET   /api/v1/projects
GET   /api/v1/projects/{id}
PATCH /api/v1/projects/{id}/status
```

Authentication:

```text
Admin cookie required
```

Allowed project statuses:

```text
PLANNING
IN_PROGRESS
ON_HOLD
COMPLETED
CANCELLED
```

### Project Notes

Project notes allow the admin to keep track of decisions, reminders, progress updates, and communication history.

Features:

* Add note to project
* List notes for project

Endpoints:

```http
POST /api/v1/projects/{projectId}/notes
GET  /api/v1/projects/{projectId}/notes
```

Authentication:

```text
Admin cookie required
```

### Quotes

Quotes represent estimates connected to projects.

Features:

* Create quote for project
* List quotes for project
* Get quote by ID
* Update quote status
* Recalculate quote total from line items

Endpoints:

```http
POST  /api/v1/projects/{projectId}/quotes
GET   /api/v1/projects/{projectId}/quotes
GET   /api/v1/quotes/{id}
PATCH /api/v1/quotes/{id}/status
PATCH /api/v1/quotes/{id}/recalculate-total
```

Authentication:

```text
Admin cookie required
```

Allowed quote statuses:

```text
DRAFT
SENT
ACCEPTED
DECLINED
EXPIRED
```

### Quote Line Items

Quote line items represent itemized parts of an estimate.

Examples:

* Labor
* Materials
* Delivery
* Installation
* Finishing
* Hardware
* Additional services

Features:

* Add itemized quote line item
* List quote line items
* Edit quote line item
* Delete quote line item
* Backend calculates line total from quantity and unit price
* Quote total can be recalculated from current line items

Endpoints:

```http
POST   /api/v1/quotes/{quoteId}/items
GET    /api/v1/quotes/{quoteId}/items
PATCH  /api/v1/quotes/{quoteId}/items/{itemId}
DELETE /api/v1/quotes/{quoteId}/items/{itemId}
```

Authentication:

```text
Admin cookie required
```

Calculation logic:

```text
lineTotal = quantity × unitPrice
quoteTotal = sum(lineTotal)
```

The backend owns the calculation to avoid trusting frontend-calculated totals.

---

## Frontend Architecture

The frontend uses Next.js App Router and separates public routes from admin routes.

```text
frontend/app/
├── page.tsx
├── request-quote/
├── site/
├── admin/
│   ├── login/
│   ├── page.tsx
│   ├── leads/
│   ├── customers/
│   ├── projects/
│   └── quotes/
└── layout.tsx
```

### Public Frontend

The public frontend is designed for visitors.

Main files:

```text
frontend/app/page.tsx
frontend/app/request-quote/page.tsx
frontend/lib/public-site-data.ts
frontend/components/RequestQuoteForm.tsx
```

The public quote request form calls:

```http
POST /api/v1/leads
```

This creates:

```text
Customer + Lead
```

### Admin Frontend

The admin frontend is designed for internal business operations.

Main routes:

```text
/admin
/admin/leads
/admin/leads/[id]
/admin/customers
/admin/customers/[id]
/admin/projects
/admin/projects/[id]
/admin/quotes/[id]
```

Admin pages use server-side API helpers to fetch backend data and forward the admin cookie to protected backend endpoints.

Client-side admin action components include:

```text
LeadStatusActions
ProjectStatusActions
QuoteStatusActions
CreateProjectFromLeadForm
ProjectNoteForm
ProjectQuoteForm
QuoteLineItemForm
EditQuoteLineItemForm
DeleteQuoteLineItemButton
RecalculateQuoteTotalButton
AdminLogoutButton
```

### Shared Frontend Utilities

Reusable frontend utilities include:

```text
frontend/lib/api.ts
frontend/lib/auth-api.ts
frontend/lib/format.ts
frontend/lib/public-site-data.ts
```

Reusable UI components include:

```text
Card
PageHeader
StatusBadge
AppShell
```

---

## Frontend Features

### Public Homepage

The homepage introduces the business and presents public-facing content.

Features:

* Hero section
* Services section
* Portfolio/work examples section
* Process section
* Quote request call-to-action

Route:

```text
/
```

### Public Quote Request

The quote request page allows a visitor to submit their project information.

Route:

```text
/request-quote
```

Submitting the form calls:

```http
POST /api/v1/leads
```

Backend result:

```text
Customer + Lead
```

### Admin Login

The login page allows the admin to access internal tools.

Route:

```text
/admin/login
```

Successful login:

```text
Backend sets cafocolo_admin_token cookie
Frontend redirects to /admin
```

### Admin Dashboard

The dashboard shows a high-level overview of business activity.

Route:

```text
/admin
```

Dashboard information:

* Total leads
* Open leads
* Active projects
* Recent leads
* Recent projects

### Lead Management

Lead management supports:

* Viewing all leads
* Opening lead detail pages
* Updating lead status
* Creating a project from a lead

Routes:

```text
/admin/leads
/admin/leads/[id]
```

Status update endpoint:

```http
PATCH /api/v1/leads/{id}/status
```

Project creation endpoint:

```http
POST /api/v1/leads/{leadId}/project
```

### Customer Management

Customer management supports:

* Viewing all customers
* Opening customer detail pages
* Viewing customer leads
* Viewing customer projects

Routes:

```text
/admin/customers
/admin/customers/[id]
```

Endpoints:

```http
GET /api/v1/customers
GET /api/v1/customers/{id}
GET /api/v1/customers/{id}/leads
GET /api/v1/customers/{id}/projects
```

### Project Management

Project management supports:

* Viewing all projects
* Opening project detail pages
* Updating project status
* Adding project notes
* Viewing project notes
* Creating quotes for a project

Routes:

```text
/admin/projects
/admin/projects/[id]
```

Project endpoints:

```http
GET   /api/v1/projects
GET   /api/v1/projects/{id}
PATCH /api/v1/projects/{id}/status
```

Project notes endpoints:

```http
POST /api/v1/projects/{projectId}/notes
GET  /api/v1/projects/{projectId}/notes
```

### Quote Management

Quote management supports:

* Creating quotes from a project page
* Viewing quote details
* Updating quote status
* Adding quote line items
* Editing quote line items
* Deleting quote line items
* Recalculating quote totals

Routes:

```text
/admin/quotes/[id]
```

Quote endpoints:

```http
POST  /api/v1/projects/{projectId}/quotes
GET   /api/v1/projects/{projectId}/quotes
GET   /api/v1/quotes/{id}
PATCH /api/v1/quotes/{id}/status
PATCH /api/v1/quotes/{id}/recalculate-total
```

Quote line item endpoints:

```http
POST   /api/v1/quotes/{quoteId}/items
GET    /api/v1/quotes/{quoteId}/items
PATCH  /api/v1/quotes/{quoteId}/items/{itemId}
DELETE /api/v1/quotes/{quoteId}/items/{itemId}
```

---

## Database Design Overview

The database is PostgreSQL and is managed through Flyway migrations.

Core tables:

```text
customers
leads
projects
project_notes
quotes
quote_line_items
flyway_schema_history
```

### Main Relationships

```text
Customer
  ├── Leads
  └── Projects

Lead
  └── Optional Project

Project
  ├── Project Notes
  └── Quotes

Quote
  └── Quote Line Items
```

### Database Migrations

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

## API Documentation

Detailed backend API documentation is available at:

```text
backend/API.md
```

The API documentation includes:

* Public endpoints
* Protected endpoints
* Auth flow
* Request body examples
* Response examples
* Workflow statuses
* Error response formats
* Local PowerShell testing commands

---

## Running the Full Stack Locally

### 1. Start PostgreSQL

Make sure PostgreSQL is running locally.

Expected local database configuration:

```text
Database: cafocolo
Username: postgres
Password: postgres
Port: 5432
```

### 2. Start the Backend

From the backend directory:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

### 3. Start the Frontend

From the frontend directory:

```powershell
cd frontend
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

### 4. Confirm Environment Variables

Make sure this file exists:

```text
frontend/.env.local
```

With this value:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

---

## Local Testing Flow

### Public Visitor Flow

1. Open:

```text
http://localhost:3000/
```

2. Open:

```text
http://localhost:3000/request-quote
```

3. Submit a quote request.

Expected backend result:

```text
Customer + Lead created
```

4. Log in as admin and confirm the new lead appears.

### Admin Workflow

1. Open:

```text
http://localhost:3000/admin/login
```

2. Log in with:

```text
admin@cafocolo.local
admin123
```

3. Open:

```text
http://localhost:3000/admin
```

4. Test the full workflow:

```text
Review lead
Update lead status
Create project from lead
Update project status
Add project note
Create quote
Add quote line item
Edit quote line item
Delete quote line item
Recalculate quote total
Update quote status
Logout
```

### Backend Auth Testing with PowerShell

Login and store the cookie in a PowerShell session:

```powershell
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/v1/auth/login" `
  -Method Post `
  -WebSession $session `
  -ContentType "application/json" `
  -Body '{"email":"admin@cafocolo.local","password":"admin123"}'
```

Use the authenticated session on a protected endpoint:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8080/api/v1/customers" `
  -Method Get `
  -WebSession $session
```

Test that protected endpoints are blocked without a cookie:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8080/api/v1/customers" `
  -Method Get
```

Expected result:

```text
401 Unauthorized or 403 Forbidden
```

Logout:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8080/api/v1/auth/logout" `
  -Method Post `
  -WebSession $session
```

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

Example unauthorized or forbidden access:

```text
401 Unauthorized
```

or:

```text
403 Forbidden
```

---

## Quality Checks

### Backend

From the backend directory:

```powershell
.\mvnw.cmd clean test
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

---

## Current Development Phase

The project has moved from backend-first development into a secured full-stack MVP.

Completed phase:

```text
Backend operations core
Database schema migrations
Frontend public website
Frontend admin dashboard
Public quote request flow
Frontend read/write integration with backend APIs
Lead-to-project workflow
Project note workflow
Quote creation workflow
Quote line item management
Reusable frontend UI components
Admin authentication
Frontend admin route protection
Backend business API protection
```

Current phase:

```text
MVP readiness, deployment preparation, and portfolio case study preparation
```

---

## Remaining MVP Readiness Work

Before deployment, the project still needs:

* Production environment configuration
* Production database hosting
* Backend deployment
* Frontend deployment
* Production-safe cookie settings
* Real production admin credentials
* Responsive layout polish
* Manual QA pass across the full business workflow
* README/API documentation cleanup
* Portfolio case study with screenshots and architecture diagrams

---

## Future Product Improvements

Near-term product improvements:

* Quote PDF export
* Project photo/file attachments
* Customer search and filtering
* Lead filtering by status
* Project filtering by status
* Quote filtering by status
* Quote approval workflow
* Dashboard analytics
* Admin profile/settings page

Longer-term engineering improvements:

* Store admin users in the database
* Hash passwords with BCrypt
* Add role-based access control
* Add audit logs for admin actions
* Add backend service tests
* Add backend controller tests
* Add frontend component tests
* Add end-to-end tests
* Add CI checks through GitHub Actions
* Add observability/logging improvements
* Add rate limiting for public lead submission
* Add file upload storage for project images and documents

```
```
