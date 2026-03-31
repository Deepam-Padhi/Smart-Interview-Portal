# Render Deployment Guide (Detailed)

This guide is written for this repository structure:

- `backend/` -> Spring Boot API
- `frontend/` -> React app

It covers both frontend-only deploy and full-stack deploy on Render.

## 1. Prerequisites

- GitHub repo connected to Render
- Render account
- Branch `main` contains latest code

## 2. Frontend-Only Deployment (Fastest)

Use this if you want UI live first.

1. In Render Dashboard, click `New +` -> `Static Site`.
2. Select this GitHub repository.
3. Configure:
   - Name: `smart-interview-frontend`
   - Branch: `main`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
4. Add environment variable:
   - Key: `REACT_APP_API_BASE_URL`
   - Value: `https://example.com/api` (temporary placeholder)
5. Click `Create Static Site`.

Notes:

- UI routes should work directly.
- API-driven actions (login, quiz load, submit, results) need backend URL later.

## 3. Full-Stack Deployment (Frontend + Backend + PostgreSQL)

### 3.1 Create PostgreSQL on Render

1. `New +` -> `PostgreSQL`
2. Set:
   - Name: `smart-interview-db`
   - Database: `interview_portal`
   - User: choose generated or custom
   - Region: pick same region for all services
3. Create DB.
4. Copy connection details from Render dashboard.

### 3.2 Deploy Backend Web Service

1. `New +` -> `Web Service`
2. Select same repo
3. Configure service:
   - Name: `smart-interview-backend`
   - Branch: `main`
   - Runtime: `Docker`
   - Root Directory: leave empty
   - Dockerfile Path: `backend/Dockerfile`
4. Add env vars:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `SPRING_JPA_HIBERNATE_DDL_AUTO=update`
5. For JDBC URL, use this exact format:

```text
jdbc:postgresql://<host>:5432/<database>
```

Do not use `postgresql://...` without `jdbc:`.

6. Deploy service.
7. After success, copy backend public URL:

```text
https://smart-interview-backend.onrender.com
```

### 3.3 Update Frontend to Use Backend URL

In frontend static site settings, set:

- `REACT_APP_API_BASE_URL=https://smart-interview-backend.onrender.com/api`

Then trigger a manual redeploy of frontend.

## 4. Validation Checklist

### Frontend

- Opens successfully
- Main pages load
- No blank white screen

### Backend

- Service is `Live`
- Logs show Spring Boot started
- Port binding is automatic from `PORT`

### End-to-end

- Login/register works
- Course/question fetch works
- Result submission works

## 5. Common Errors and Fixes

### Error: JDBC driver does not accept URL

Cause: datasource URL missing `jdbc:` prefix.

Fix:

```text
Use jdbc:postgresql://<host>:5432/<db>
```

### Error: Could not connect to DB / UnknownHostException

Cause: malformed DB URL or credentials in URL host section.

Fix:

- Put credentials in username/password fields
- Keep URL host clean
- Use Render DB host exactly as shown

### Frontend works but API calls fail

Cause: frontend environment variable not set or stale build.

Fix:

- Set `REACT_APP_API_BASE_URL` correctly
- Redeploy frontend after changing env vars

## 6. Recommended Render Service Layout

- `smart-interview-frontend` (Static Site)
- `smart-interview-backend` (Web Service, Docker)
- `smart-interview-db` (PostgreSQL)

## 7. Optional Hardening

- Limit CORS origins to your frontend domain
- Use `ddl-auto=validate` in production
- Add health endpoint and uptime monitoring
- Rotate DB credentials periodically

## 8. Deployment Flow You Can Reuse

1. Push code to GitHub `main`
2. Backend auto deploys (if enabled)
3. Frontend auto deploys (if enabled)
4. Validate logs and app routes

This is the cleanest repeatable flow for this project on Render.
