# Cafocolo Deployment Guide

This document tracks the deployed production configuration for the Cafocolo full-stack MVP.

## Live Production URLs

Frontend:

```text
https://cafocolo-platform.vercel.app
```

Backend API:

```text
https://cafocolo-api.onrender.com
```

Backend health check:

```text
https://cafocolo-api.onrender.com/api/v1/health
```

Database:

```text
Neon PostgreSQL
```

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

The frontend does not call the Render backend directly from every page. Instead, it uses a Next.js proxy route:

```text
/backend-api/...
```

The proxy forwards requests to:

```text
https://cafocolo-api.onrender.com/...
```

This keeps HTTP-only admin cookies working correctly across the deployed frontend and backend.

---

## Services

### Frontend

Provider:

```text
Vercel
```

Application:

```text
Next.js frontend
```

Root directory:

```text
frontend
```

Production URL:

```text
https://cafocolo-platform.vercel.app
```

Production environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

### Backend

Provider:

```text
Render Web Service
```

Application:

```text
Dockerized Spring Boot API
```

Root directory:

```text
backend
```

Production URL:

```text
https://cafocolo-api.onrender.com
```

Health check:

```text
https://cafocolo-api.onrender.com/api/v1/health
```

Render deployment settings:

```text
Language: Docker
Root Directory: backend
Dockerfile Path: Dockerfile
Docker Build Context Directory: .
Docker Command: leave blank
Instance Type: Free
```

The backend Dockerfile is located at:

```text
backend/Dockerfile
```

The Dockerfile already defines the command to run the Spring Boot app, so Render does not need a separate Docker command.

### Database

Provider:

```text
Neon PostgreSQL
```

Database:

```text
neondb
```

Role:

```text
neondb_owner
```

The backend uses Flyway migrations, so the production database schema is created and updated automatically when the backend starts.

Production tables include:

```text
customers
leads
projects
project_notes
quotes
quote_line_items
flyway_schema_history
```

---

## Production Environment Variables

### Backend Environment Variables on Render

Set these in the Render backend service.

Do not commit real production secrets to GitHub.

```env
DATABASE_URL=jdbc:postgresql://YOUR_NEON_HOST/neondb?sslmode=require
DATABASE_USERNAME=neondb_owner
DATABASE_PASSWORD=YOUR_NEON_PASSWORD

CAFOCOLO_ADMIN_EMAIL=admin@cafocolo.local
CAFOCOLO_ADMIN_PASSWORD=YOUR_STRONG_ADMIN_PASSWORD
CAFOCOLO_JWT_SECRET=YOUR_LONG_RANDOM_SECRET

CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

Important notes:

```text
CAFOCOLO_COOKIE_SECURE=true
```

is required because production runs over HTTPS.

```text
CAFOCOLO_COOKIE_SAME_SITE=None
```

is required because the frontend and backend are on different hosted domains.

```text
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

must match the deployed Vercel frontend origin exactly.

Do not add a trailing slash.

Correct:

```env
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

Wrong:

```env
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app/
```

### Frontend Environment Variables on Vercel

Set these in the Vercel frontend project.

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

`NEXT_PUBLIC_API_BASE_URL` is used by browser/client-side frontend code.

`BACKEND_API_BASE_URL` is used by the Next.js server/proxy route to forward requests to the Render backend.

---

## Important Database URL Note

The backend expects a JDBC URL.

Correct format:

```text
jdbc:postgresql://HOST:PORT/DATABASE
```

or, if SSL is required:

```text
jdbc:postgresql://HOST:PORT/DATABASE?sslmode=require
```

Some database providers show a URL like this:

```text
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

That is a PostgreSQL connection URL, but Spring Boot should receive a JDBC-style URL through `DATABASE_URL`.

Use this pattern:

```env
DATABASE_URL=jdbc:postgresql://HOST:PORT/DATABASE?sslmode=require
DATABASE_USERNAME=YOUR_DATABASE_USER
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
```

---

## Local Development Configuration

Local frontend `.env.local` should use the proxy setup when testing against the deployed Render backend:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

For fully local development with a local backend, use:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

If using the local backend, the backend should use:

```env
CAFOCOLO_COOKIE_SECURE=false
CAFOCOLO_COOKIE_SAME_SITE=Lax
CAFOCOLO_FRONTEND_ORIGIN=http://localhost:3000
```

---

## Backend Configuration Support

The backend supports deployment environment variables through:

```text
backend/src/main/resources/application.yml
```

The backend supports the platform-provided port through:

```yml
server:
  port: ${PORT:8080}
```

This means the app uses port `8080` locally, but Render can provide its own runtime port in production.

---

## Deployment Order Used

The production deployment was completed in this order:

```text
1. Created Neon PostgreSQL database.
2. Tested local backend against Neon.
3. Confirmed Flyway created production tables.
4. Added backend Dockerfile for Render.
5. Deployed Spring Boot backend to Render as a Docker web service.
6. Confirmed Render health check worked.
7. Added Next.js /backend-api proxy route.
8. Tested local frontend against deployed Render backend.
9. Deployed frontend to Vercel.
10. Set Vercel frontend environment variables.
11. Updated Render CAFOCOLO_FRONTEND_ORIGIN to the Vercel URL.
12. Tested production public and admin flows.
```

---

## Production QA Checklist

### Public Website

Check:

```text
/
```

Expected:

```text
Public homepage loads.
```

Check:

```text
/request-quote
```

Expected:

```text
Public quote request form loads.
```

Submit a quote request.

Expected:

```text
Customer and lead are created in Neon.
```

### Admin Authentication

Check:

```text
/admin
```

Expected when logged out:

```text
Redirects to /admin/login.
```

Check:

```text
/admin/login
```

Expected:

```text
Admin can log in with the Render production admin credentials.
```

After login:

```text
/admin
```

Expected:

```text
Dashboard loads.
```

Click logout.

Expected:

```text
Admin is sent back to /admin/login.
```

### Admin Business Workflow

Test:

```text
View leads
Open lead detail
Update lead status
Create project from lead
Open project
Update project status
Add project note
Create quote
Open quote
Add line item
Edit line item
Delete line item
Recalculate quote total
Update quote status
```

Expected:

```text
All admin workflows work after login.
```

### Backend Security

Unauthenticated request:

```http
GET /api/v1/customers
```

Expected:

```text
401 Unauthorized or 403 Forbidden
```

Public request:

```http
POST /api/v1/leads
```

Expected:

```text
Lead creation works without login.
```

Health check:

```http
GET /api/v1/health
```

Expected:

```text
Health endpoint works publicly.
```

---

## Common Deployment Issues

### Backend root URL shows 403

This is expected:

```text
https://cafocolo-api.onrender.com
```

The backend does not have a public homepage at `/`.

Use the health endpoint instead:

```text
https://cafocolo-api.onrender.com/api/v1/health
```

### CORS Error

Check the Render backend environment variable:

```env
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

It must match the frontend origin exactly.

No trailing slash.

### Login Works, But Admin Data Fails

Check Render:

```env
CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

Check Vercel:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

Also confirm both services were redeployed after environment variable changes.

### Admin Shows 403 After Switching Backends

Clear old browser cookies for the frontend domain.

This can happen if the browser still has an old `cafocolo_admin_token` signed by a previous backend JWT secret.

Fix:

```text
Clear cookies for localhost or the Vercel domain.
Log in again.
```

### Backend Cannot Connect to Database

Check Render backend environment variables:

```env
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
```

Make sure `DATABASE_URL` is a JDBC URL:

```text
jdbc:postgresql://HOST:PORT/DATABASE?sslmode=require
```

Also confirm the Neon password is correct.

### Backend Docker Build Fails on Render

Confirm Render settings:

```text
Language: Docker
Root Directory: backend
Dockerfile Path: Dockerfile
Docker Build Context Directory: .
Docker Command: leave blank
```

If Render tries to find `backend/backend`, the Dockerfile path is probably wrong.

Correct:

```text
Root Directory: backend
Dockerfile Path: Dockerfile
```

Wrong:

```text
Root Directory: backend
Dockerfile Path: backend/Dockerfile
```

### Frontend Build Uses Wrong Backend URL

Check Vercel environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=/backend-api
BACKEND_API_BASE_URL=https://cafocolo-api.onrender.com
```

Then redeploy the frontend.

### Render Free Instance Sleeps

The backend is currently on Render's free instance type.

Expected behavior:

```text
The first request after inactivity may be slow because the backend needs to wake up.
```

This is acceptable for demo/MVP use.

For production business use, upgrade the backend to an always-on paid instance.

---

## Deployment Status

Current status:

```text
Frontend deployed on Vercel.
Backend deployed on Render as a Docker service.
Database deployed on Neon PostgreSQL.
Backend health check is public and working.
Public quote form works in production.
Admin login works in production.
Admin dashboard can read production data.
GitHub main branch is synced with local main.
```

Remaining future improvements:

```text
Clean test data from Neon.
Add admin delete/archive flows.
Add image upload/storage for project photos.
Add email notification for new quote requests.
Add custom domain.
Upgrade Render backend to always-on if used for real business operations.
Containerize the full local development stack with Docker Compose.
Add CI/CD checks with GitHub Actions.
```
