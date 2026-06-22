# Cafocolo Deployment Guide

This document tracks the deployment configuration for the Cafocolo full-stack MVP.

The goal is to deploy the application as three services:

```text
User Browser
    ↓
Vercel Frontend: Next.js
    ↓
Render Backend: Spring Boot API
    ↓
Hosted PostgreSQL: Neon or Render PostgreSQL
```

---

## Target Deployment Architecture

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

Main production environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://YOUR_BACKEND_URL
```

### Backend

Provider:

```text
Render Web Service
```

Application:

```text
Spring Boot API
```

Root directory:

```text
backend
```

Build command:

```bash
./mvnw clean package -DskipTests
```

Start command:

```bash
java -jar target/cafocolo-api-0.0.1-SNAPSHOT.jar
```

### Database

Recommended free database provider:

```text
Neon PostgreSQL
```

Alternative:

```text
Render PostgreSQL
```

The backend uses Flyway migrations, so the production database schema should be created automatically when the backend starts.

---

## Production Environment Variables

### Backend Environment Variables

Set these in the backend hosting provider.

```env
DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=

CAFOCOLO_ADMIN_EMAIL=
CAFOCOLO_ADMIN_PASSWORD=
CAFOCOLO_JWT_SECRET=

CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
CAFOCOLO_FRONTEND_ORIGIN=https://YOUR_FRONTEND_URL
```

### Frontend Environment Variables

Set this in Vercel.

```env
NEXT_PUBLIC_API_BASE_URL=https://YOUR_BACKEND_URL
```

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

## Backend Render Setup

Create a new Render Web Service connected to the GitHub repository.

Use these settings:

```text
Root Directory: backend
Build Command: ./mvnw clean package -DskipTests
Start Command: java -jar target/cafocolo-api-0.0.1-SNAPSHOT.jar
```

The backend already supports Render's dynamic port configuration:

```yml
server:
  port: ${PORT:8080}
```

This means the app uses `8080` locally, but in production it can use the `PORT` value provided by the hosting platform.

---

## Backend Environment Variables on Render

Add these to the Render backend service environment settings:

```env
DATABASE_URL=jdbc:postgresql://HOST:PORT/DATABASE?sslmode=require
DATABASE_USERNAME=YOUR_DATABASE_USER
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD

CAFOCOLO_ADMIN_EMAIL=YOUR_ADMIN_EMAIL
CAFOCOLO_ADMIN_PASSWORD=YOUR_STRONG_ADMIN_PASSWORD
CAFOCOLO_JWT_SECRET=YOUR_LONG_RANDOM_SECRET

CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
CAFOCOLO_FRONTEND_ORIGIN=https://YOUR_FRONTEND_URL
```

Do not commit real production values to GitHub.

---

## Frontend Vercel Setup

Create a new Vercel project connected to the GitHub repository.

Use these settings:

```text
Root Directory: frontend
Framework Preset: Next.js
```

Set this environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://YOUR_BACKEND_URL
```

After changing environment variables in Vercel, redeploy the frontend.

---

## Cookie and CORS Configuration

The app uses an HTTP-only cookie named:

```text
cafocolo_admin_token
```

For local development:

```env
CAFOCOLO_COOKIE_SECURE=false
CAFOCOLO_COOKIE_SAME_SITE=Lax
CAFOCOLO_FRONTEND_ORIGIN=http://localhost:3000
```

For production, when frontend and backend are on different HTTPS domains:

```env
CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
CAFOCOLO_FRONTEND_ORIGIN=https://YOUR_FRONTEND_URL
```

The frontend origin must match the deployed frontend URL exactly.

Examples:

Correct:

```env
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app
```

Wrong:

```env
CAFOCOLO_FRONTEND_ORIGIN=http://cafocolo-platform.vercel.app
```

Wrong:

```env
CAFOCOLO_FRONTEND_ORIGIN=https://cafocolo-platform.vercel.app/
```

Avoid trailing slashes.

---

## Deployment Order

Use this order:

```text
1. Create hosted PostgreSQL database.
2. Copy database connection details.
3. Create Render backend web service.
4. Add backend environment variables.
5. Deploy backend.
6. Test backend health endpoint.
7. Create Vercel frontend project.
8. Add frontend environment variable.
9. Deploy frontend.
10. Update backend CAFOCOLO_FRONTEND_ORIGIN with final frontend URL.
11. Redeploy backend.
12. Run production QA checklist.
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
Customer and lead are created.
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
Admin can log in.
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

### CORS Error

Check:

```env
CAFOCOLO_FRONTEND_ORIGIN=https://YOUR_FRONTEND_URL
```

This must match the frontend origin exactly.

### Login Works, But Admin Data Fails

Check:

```env
CAFOCOLO_COOKIE_SECURE=true
CAFOCOLO_COOKIE_SAME_SITE=None
NEXT_PUBLIC_API_BASE_URL=https://YOUR_BACKEND_URL
```

Also confirm the frontend was redeployed after changing `NEXT_PUBLIC_API_BASE_URL`.

### Backend Cannot Connect to Database

Check:

```env
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
```

Make sure `DATABASE_URL` is a JDBC URL:

```text
jdbc:postgresql://HOST:PORT/DATABASE?sslmode=require
```

### Backend Port Issue

The backend must use the platform-provided port.

The app already supports:

```yml
server:
  port: ${PORT:8080}
```

### Backend Build Fails

Confirm the Render backend service has:

```text
Root Directory: backend
Build Command: ./mvnw clean package -DskipTests
Start Command: java -jar target/cafocolo-api-0.0.1-SNAPSHOT.jar
```

### Frontend Build Uses Wrong Backend URL

Check Vercel environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://YOUR_BACKEND_URL
```

Then redeploy the frontend.

---

## Deployment Readiness Status

Current status:

```text
Backend config supports environment variables.
Backend port supports deployment platforms.
Backend CORS supports configurable frontend origin.
Auth cookie Secure and SameSite settings are configurable.
Frontend API base URL is configurable.
Database schema is managed by Flyway.
```

Remaining before first deployment:

```text
Create hosted PostgreSQL database.
Deploy backend service.
Deploy frontend service.
Connect final production URLs.
Run production QA.
```
