# Smart Interview Portal

[![Java](https://img.shields.io/badge/Java-21-blue)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.12-6DB33F)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)](https://www.docker.com/)

A full-stack interview preparation platform with topic-based quizzes, course flows, authentication, and modern deployment support.

## Why This Project

Smart Interview Portal helps learners prepare for technical interviews through structured topic practice and guided quiz progression.

The project is built with a production-ready stack:

- Backend API with Spring Boot and JPA
- Frontend client with React
- PostgreSQL for persistence
- Dockerized services for consistent deployment

## Core Features

- User registration and login flow
- Topic and course-based quiz selection
- Difficulty-aware question flow
- Result and performance views
- Admin dashboard for course and question operations
- Resume analyzer module for interview support

## Architecture

Monorepo structure:

```text
smart interview portal/
  backend/   -> Spring Boot API
  frontend/  -> React application
```

High-level flow:

1. Frontend calls API endpoints under `/api`
2. Backend processes business logic and persistence
3. PostgreSQL stores users, courses, questions, and results

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Data JPA, Maven
- Frontend: React, Axios, CSS
- Database: PostgreSQL
- Containerization: Docker, Docker Compose

## Local Development

### Prerequisites

- Java 21
- Node.js 18+
- Maven (or Maven Wrapper)
- PostgreSQL 15 (or Docker)

### 1. Run Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend default URL: `http://localhost:8080`

### 2. Run Frontend

```powershell
cd frontend
npm install
npm start
```

Frontend default URL: `http://localhost:3000`

## Build Validation

Backend compile:

```powershell
cd backend
.\mvnw.cmd -DskipTests compile
```

Frontend production build:

```powershell
cd frontend
npm run build
```

## Docker

Run full stack with Docker Compose:

```powershell
docker-compose up --build
```

Services:

- Frontend: `http://localhost`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

## Railway Deployment

Deploy backend and frontend as separate services from the same repository.

1. Create a new Railway project.
2. Add PostgreSQL plugin.
3. Create backend service:
   - Dockerfile Path: `backend/Dockerfile`
   - Keep root context as repository root.
4. Create frontend service:
   - Dockerfile Path: `frontend/Dockerfile`
   - Keep root context as repository root.
5. Set frontend variable:
   - `REACT_APP_API_BASE_URL=https://<backend-domain>/api`
6. Redeploy frontend after setting the variable.

Backend uses Railway PostgreSQL variables automatically:

- `PGHOST`
- `PGPORT`
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`

## Configuration Notes

- Backend port is configurable with `PORT` (cloud-friendly).
- CORS is configured in backend config.
- Frontend API base URL can be set via environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Author

Deepam Padhi

