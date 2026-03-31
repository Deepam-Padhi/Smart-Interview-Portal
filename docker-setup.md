# Docker Setup Guide

## Overview
This application is now containerized with:
- **Backend**: Spring Boot with Java 21
- **Frontend**: React with Nginx
- **Database**: PostgreSQL 15

## Prerequisites
- Docker Desktop (or Docker + Docker Compose)
- Git

## Build and Run with Docker Compose

### Quick Start
```bash
# Navigate to project root
cd "Smart Interview Portal"

# Build and start all services
docker-compose up --build

# In detached mode (background)
docker-compose up -d --build
```

### Services
- **Frontend**: http://localhost (port 80)
- **Backend**: http://localhost:8080 (port 8080)
- **PostgreSQL**: localhost:5432

### Database Credentials (Development)
- **Username**: postgres
- **Password**: postgres
- **Database**: interview_portal

## Commands

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (Clean)
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild Specific Service
```bash
docker-compose up --build backend
```

## Building Individual Images

### Backend
```bash
docker build -t interview-portal-backend ./backend
```

### Frontend
```bash
docker build -t interview-portal-frontend ./frontend
```

## Database Management

### Access PostgreSQL CLI
```bash
docker-compose exec postgres psql -U postgres -d interview_portal
```

### Backup Database
```bash
docker-compose exec postgres pg_dump -U postgres interview_portal > backup.sql
```

### Restore Database
```bash
docker-compose exec -T postgres psql -U postgres interview_portal < backup.sql
```

## Environment Variables

### Backend (application.properties)
Currently configured for Docker networking:
- `spring.datasource.url`: jdbc:postgresql://postgres:5432/interview_portal
- `spring.datasource.username`: postgres
- `spring.datasource.password`: postgres

### Local Development
Create `.env` file for local overrides or use environment variables.

## Troubleshooting

### Port Already in Use
```bash
# Change ports in docker-compose.yml
# e.g., "8081:8080" instead of "8080:8080"
```

### Database Connection Issues
```bash
# Check if database is healthy
docker-compose ps

# View database logs
docker-compose logs postgres
```

### Backend Startup Issues
```bash
# Rebuild without cache
docker-compose build --no-cache backend

# Full restart
docker-compose down -v
docker-compose up --build
```

## Production Considerations

1. **Security**: Change default database credentials
2. **Environment Variables**: Use .env files or secrets management
3. **Volumes**: Configure persistent storage locations
4. **Networking**: Use internal networks only (remove unnecessary port mappings)
5. **SSL/TLS**: Configure reverse proxy with SSL certificates
6. **Resource Limits**: Add memory/CPU constraints in docker-compose.yml
7. **Registry**: Push images to Docker Hub or private registry

## Git Push to Friend's Repo

After completing Docker setup:
```bash
# Add remote to friend's repo (if not already done)
git remote add friend https://github.com/Deepam-Padhi/Smart-Interview-Portal.git

# Or update existing remote
git remote set-url origin https://github.com/Deepam-Padhi/Smart-Interview-Portal.git

# Push changes
git push -u origin main
# or
git push -u friend main
```
