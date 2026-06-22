# Cafocolo Platform

Cafocolo Platform is a full-stack business operations system for a construction, renovation, and custom furniture business.

The platform helps the business move from informal customer/project tracking into a structured digital workflow for managing customer inquiries, leads, customers, projects, project notes, quotes, and itemized estimates.

The application includes:

* A public customer-facing website
* A public quote request form
* A protected internal admin dashboard
* A secured Spring Boot backend API
* A PostgreSQL database managed with Flyway migrations
* A deployed production architecture using Vercel, Render, and Neon

---

## Live Demo

Frontend:

```text
https://cafocolo-platform.vercel.app
```

Backend health check:

```text
https://cafocolo-api.onrender.com/api/v1/health
```

Backend root note:

```text
https://cafocolo-api.onrender.com
```

The backend root URL may return `403 Forbidden` because the backend does not serve a public homepage. Use the health endpoint to confirm the API is running.

---

## Production Architecture

```text
User Browser
    ↓
Vercel Frontend: Next.js
    ↓
Next.js /backend-api proxy route
    ↓
Render Backend: Dockerized Spring Boot API
    ↓
Neon PostgreSQL
```

The frontend uses a Next.js proxy route:

```text
/backend-api/...
```

The proxy forwards API requests to the deployed backend:

```text
https://cafocolo-api.onrender.com/...
```

This keeps HTTP-only admin cookies working correctly between the deployed frontend and backend.

---

## Current Status

Cafocolo Platform is a deployed secured full-stack MVP.

The deployed MVP supports the core business workflow:

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

The project is deployed with:

```text
Frontend: Vercel
Backend: Render Docker Web Service
Database: Neon PostgreSQL
```

---

## Core Features

### Public Website

The public website allows visitors to learn about the business and submit quote requests.

Current public features:

* Public homepage at `/`
* Public quote request form at `/request-quote`
* Services section
* Portfolio/work section
* Process overview section
* Public call-to-action links
* Quote request submission
* Automatic customer and lead creation
* `/site` compatibility redirect to `/`

### Admin Dashboard

The admin dashboard is used by the business owner/operator to manage work after a customer submits a quote request.

Current admin features:

* Admin login page at `/admin/login`
* Protected admin dashboard at `/admin`
* Protected admin routes under `/admin/**`
* Admin logout
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

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router
* ESLint

### Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* PostgreSQL
* Flyway
* Maven
* JJWT

### Database

* PostgreSQL
* Neon PostgreSQL in production
* Flyway-managed schema migrations

### Deployment

* Vercel for the Next.js frontend
* Render for the Dockerized Spring Boot backend
* Neon for hosted PostgreSQL
* Dockerfile-based backend deployment

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
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── pom.xml
│   └── mvnw.cmd
│
├── frontend/
│   ├── app/
│   │   ├── admin/
│   │   ├── backend-api/
│   │   ├── request-quote/
│   │   ├── site/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── proxy.ts
│   └── package.json
│
├── DEPLOYMENT.md
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
Frontend sends credentials through /backend-api proxy
        ↓
Backend validates email/password
        ↓
Backend creates JWT
        ↓
Backend stores JWT in HTTP-only cookie
        ↓
Frontend redirects to /admin
        ↓
Frontend route protection checks for the cookie
        ↓
Backend validates the cookie for protected business APIs
```

### Why HTTP-Only Cookies

The JWT is not manually stored in localStorage or sessionStorage.

This improves the MVP security model because:

* Browser JavaScript cannot directly read the token.
* The backend controls cookie creation and expiration.
* The browser automatically includes the cookie when credentials are enabled.
* Frontend route protection can check for the cookie server-side.
* Backend Spring Security remains the final authority for protected business data.

### Public Backend Access

Public endpoints:

```text
GET  /api/v1/health
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
POST /api/v1/leads
```

### Protected Backend Access

Protected endpoints include:

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

For production on Vercel:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

For local development against the deployed backend:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

For local development against a local backend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Backend Environment

The backend supports these environment variables:

```env
DATABASE_URL=jdbc:postgresql://HOST/DATABASE?sslmode=require
DATABASE_USERNAME=YOUR_DATABASE_USER
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD

CAFOCOLO_ADMIN_EMAIL=YOUR_ADMIN_EMAIL
CAFOCOLO_ADMIN_PASSWORD=YOUR_STRONG_ADMIN_PASSWORD
CAFOCOLO_JWT_SECRET=YOUR_LONG_RANDOM_SECRET

CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

Local development defaults are configured in `application.yml`.

Production credentials and secrets should only be stored in the hosting provider’s environment variable settings.

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

* Creating a customer and lead from a public quote request
* Updating lead statuses
* Creating a project from a lead
* Validating project relationships
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

Endpoints:

```http
POST /api/v1/auth/login
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

Features:

* Admin login
* Admin session check
* Admin logout
* JWT creation
* JWT validation
* HTTP-only cookie creation
* HTTP-only cookie expiration
* Protected API authentication

### Customers

Endpoints:

```http
GET /api/v1/customers
GET /api/v1/customers/{id}
GET /api/v1/customers/{id}/leads
GET /api/v1/customers/{id}/projects
```

Features:

* List all customers
* Get customer by ID
* Get leads for a customer
* Get projects for a customer

Authentication:

```text
Admin cookie required
```

### Leads

Endpoints:

```http
POST  /api/v1/leads
GET   /api/v1/leads
GET   /api/v1/leads/{id}
PATCH /api/v1/leads/{id}/status
```

Features:

* Create lead from public quote request
* List all leads
* Get lead by ID
* Update lead status

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

Endpoints:

```http
POST  /api/v1/leads/{leadId}/project
GET   /api/v1/projects
GET   /api/v1/projects/{id}
PATCH /api/v1/projects/{id}/status
```

Features:

* Create project from lead
* List all projects
* Get project by ID
* Update project status

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

Endpoints:

```http
POST /api/v1/projects/{projectId}/notes
GET  /api/v1/projects/{projectId}/notes
```

Features:

* Add note to project
* List notes for project

Authentication:

```text
Admin cookie required
```

### Quotes

Endpoints:

```http
POST  /api/v1/projects/{projectId}/quotes
GET   /api/v1/projects/{projectId}/quotes
GET   /api/v1/quotes/{id}
PATCH /api/v1/quotes/{id}/status
PATCH /api/v1/quotes/{id}/recalculate-total
```

Features:

* Create quote for project
* List quotes for project
* Get quote by ID
* Update quote status
* Recalculate quote total from line items

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

Endpoints:

```http
POST   /api/v1/quotes/{quoteId}/items
GET    /api/v1/quotes/{quoteId}/items
PATCH  /api/v1/quotes/{quoteId}/items/{itemId}
DELETE /api/v1/quotes/{quoteId}/items/{itemId}
```

Features:

* Add itemized quote line item
* List quote line items
* Edit quote line item
* Delete quote line item
* Backend-calculated line totals
* Quote total recalculation from current line items

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
├── backend-api/
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

### Frontend Proxy

The frontend includes a Next.js proxy route:

```text
frontend/app/backend-api/[...path]/route.ts
```

This route forwards API requests from the frontend domain to the deployed backend domain.

Purpose:

* Keep frontend code using a same-origin API path
* Preserve HTTP-only cookie behavior
* Avoid browser-side cross-domain cookie issues
* Support server-rendered admin pages that need authenticated backend data

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

For local backend development:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

For testing local frontend against deployed Render backend:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
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

2. Log in with local credentials:

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

---

## Production Testing Flow

### Public Production Flow

1. Open:

```text
https://cafocolo-platform.vercel.app
```

2. Open:

```text
https://cafocolo-platform.vercel.app/request-quote
```

3. Submit a quote request.

Expected result:

```text
Customer and lead are created in Neon.
```

### Admin Production Flow

1. Open:

```text
https://cafocolo-platform.vercel.app/admin/login
```

2. Log in with production admin credentials configured in Render.

3. Open:

```text
https://cafocolo-platform.vercel.app/admin/leads
```

4. Confirm the new lead appears.

5. Test project, notes, quote, and quote line item workflows.

---

## Deployment

Detailed deployment documentation is available at:

```text
DEPLOYMENT.md
```

Current production deployment:

```text
Frontend: Vercel
Backend: Render Docker Web Service
Database: Neon PostgreSQL
```

### Backend Deployment

The backend is deployed as a Docker service on Render.

Render settings:

```text
Language: Docker
Root Directory: backend
Dockerfile Path: Dockerfile
Docker Build Context Directory: .
Docker Command: leave blank
```

### Frontend Deployment

The frontend is deployed on Vercel.

Vercel settings:

```text
Root Directory: frontend
Framework Preset: Next.js
```

Vercel environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
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

## Completed Milestones

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
Production environment configuration
Neon PostgreSQL deployment
Render backend deployment
Vercel frontend deployment
Frontend proxy route for deployed backend access
Production public flow validation
Production admin flow validation
```

---

## Future Product Improvements

Near-term product improvements:

* Clean test data from Neon
* Add admin delete/archive flows
* Add lead filtering by status
* Add project filtering by status
* Add quote filtering by status
* Add responsive layout polish
* Add better loading and error states
* Add quote PDF export
* Add project photo/file attachments
* Add email notification for new quote requests

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
* Add Docker Compose for full local development
* Add image/file storage for project photos and documents
