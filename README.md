# Cafocolo Platform

Cafocolo Platform is a full-stack business operations platform for a construction, renovation, and custom furniture company. It supports public quote requests, internal lead management, customer tracking, project management, quote creation, line-item estimating, and bilingual English/Portuguese admin workflows.

The project was built as a real-world software engineering portfolio project to demonstrate full-stack development, backend API design, authentication, database modeling, admin workflows, deployment, and production-style business tooling.

## Live Demo

Public site:

* https://cafocolo-platform.vercel.app
* https://cafocolo-platform.vercel.app/pt

Request quote:

* https://cafocolo-platform.vercel.app/request-quote
* https://cafocolo-platform.vercel.app/pt/request-quote


## Problem

Small construction and renovation businesses often manage quote requests, customer information, project updates, and estimates through disconnected tools such as phone calls, spreadsheets, text messages, and paper notes.

That makes it harder to:

* Track new leads
* Convert leads into customers
* Turn confirmed work into projects
* Keep project notes organized
* Build accurate quotes
* Manage itemized costs
* Support bilingual communication for English and Portuguese-speaking users

Cafocolo Platform solves this by connecting the public quote request process with an internal admin system for managing the business workflow from lead intake to quote creation.

## Core Features

### Public Website

* English and Portuguese landing pages
* Company services overview
* Public quote request form
* Bilingual quote request experience
* Mobile-friendly layout

### Admin Authentication

* Secure admin login
* JWT-based authentication using HTTP-only cookies
* Protected admin routes
* English and Portuguese login flows
* Logout support

### Lead Management

* View submitted quote requests
* Open lead detail pages
* Update lead status
* Convert leads into customers/projects
* Track customer contact information and project interest

### Customer Management

* View customers
* Open customer detail pages
* See related leads
* See related projects
* Navigate from customer records into operational work

### Project Management

* View all projects
* Open project detail pages
* Update project status
* Add project notes
* Track project type, budget, dates, and description
* Create quotes from projects

### Quote Management

* Open quote detail pages
* Update quote status
* Add line items
* Edit line items
* Delete line items
* Recalculate quote totals
* View labor, material, additional costs, and total amount
* Maintain bilingual quote workflows

### Bilingual Admin Portal

The admin portal supports route parity across English and Portuguese:

English:

* `/admin`
* `/admin/login`
* `/admin/leads`
* `/admin/leads/[id]`
* `/admin/customers`
* `/admin/customers/[id]`
* `/admin/projects`
* `/admin/projects/[id]`
* `/admin/quotes/[id]`

Portuguese:

* `/pt/admin`
* `/pt/admin/login`
* `/pt/admin/leads`
* `/pt/admin/leads/[id]`
* `/pt/admin/customers`
* `/pt/admin/customers/[id]`
* `/pt/admin/projects`
* `/pt/admin/projects/[id]`
* `/pt/admin/quotes/[id]`

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router
* Server Components
* Client Components for interactive forms and actions
* Vercel deployment

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* PostgreSQL
* Flyway database migrations
* JWT authentication
* Render deployment

### Database

* PostgreSQL hosted on Neon
* Flyway-managed schema migrations

### Deployment

* Frontend: Vercel
* Backend API: Render
* Database: Neon PostgreSQL

## Architecture Overview

The application is split into a Next.js frontend and a Spring Boot backend API.

```text
User Browser
    |
    v
Next.js Frontend on Vercel
    |
    v
Next.js Backend API Proxy
    |
    v
Spring Boot API on Render
    |
    v
PostgreSQL Database on Neon
```

The frontend uses a proxy route so browser requests can communicate with the backend while preserving authentication cookies and avoiding cross-origin issues.

## Main Data Flow

```text
Public visitor submits quote request
    |
    v
Lead is created in the backend
    |
    v
Admin reviews lead
    |
    v
Lead can become a customer/project
    |
    v
Project receives notes and status updates
    |
    v
Quote is created from project
    |
    v
Line items are added, edited, deleted, and recalculated
```

## Backend API Areas

The backend includes API support for:

* Health checks
* Admin authentication
* Leads
* Customers
* Projects
* Project notes
* Quotes
* Quote line items
* Quote total recalculation
* Status updates

## Authentication

Admin authentication uses a JWT stored in an HTTP-only cookie.

The cookie-based approach keeps the admin session out of client-side JavaScript and allows protected admin pages to verify whether the user is logged in.

Admin routes are protected through the Next.js proxy layer and backend authentication checks.

## Environment Variables

### Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

### Backend

Render environment variables:

```env
DATABASE_URL=jdbc:postgresql://YOUR_NEON_HOST/neondb?sslmode=require
DATABASE_USERNAME=neondb_owner
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD

CAFOCOLO_ADMIN_EMAIL=admin@cafocolo.local
CAFOCOLO_ADMIN_PASSWORD=YOUR_SECURE_ADMIN_PASSWORD
CAFOCOLO_JWT_SECRET=YOUR_LONG_RANDOM_SECRET

CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

## Running Locally

### Backend

From the backend folder:

```powershell
cd backend
.\mvnw spring-boot:run
```

Local backend:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/api/v1/health
```

### Frontend

From the frontend folder:

```powershell
cd frontend
npm install
npm run dev
```

Local frontend:

```text
http://localhost:3000
```

## Validation Commands

From the frontend folder:

```powershell
npm run lint
npm run build
```

From the backend folder:

```powershell
.\mvnw test
```

## Screenshots

Add screenshots here before publishing the final portfolio version.

Recommended screenshots:

1. English landing page
2. Portuguese landing page
3. Request quote form
4. Admin dashboard
5. Leads page
6. Customer detail page
7. Project detail page with notes
8. Quote detail page with line items
9. Portuguese admin project page
10. Portuguese quote workflow

Suggested folder:

```text
docs/screenshots
```

Example markdown:

```md
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
![Portuguese Project Detail](docs/screenshots/pt-project-detail.png)
![Quote Detail](docs/screenshots/quote-detail.png)
```

## Project Structure

```text
cafocolo-platform
├── backend
│   ├── src/main/java
│   ├── src/main/resources
│   └── pom.xml
│
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── types
│   └── package.json
│
└── README.md
```

## What This Project Demonstrates

This project demonstrates:

* Full-stack application development
* Production-style admin workflows
* REST API design
* Authentication and protected routes
* Relational database modeling
* Database migrations with Flyway
* Bilingual user experience
* Frontend/backend deployment
* Real business workflow design
* TypeScript and Java backend integration
* Practical software engineering beyond a generic CRUD app

## Future Improvements

Potential next features:

* Admin user roles
* File uploads for project photos
* PDF quote generation
* Email notifications for quote requests
* Customer-facing quote approval links
* Dashboard analytics
* Search and filtering
* Pagination
* Audit logs
* Better quote templates
* Invoice generation
* Calendar scheduling for site visits

## Status

The MVP currently supports the core business workflow:

```text
Public quote request → Lead review → Customer/project tracking → Project notes → Quote creation → Line item estimating → Quote status management
```

The English and Portuguese admin route trees have matching coverage, and the local bilingual smoke test has passed.
