# Deployment Guide

## Services

- **User frontend**: Next.js app (`frontend/`)
- **Admin frontend**: Next.js app (`admin-frontend/`)
- **Backend API**: NestJS app (`backend/`)

## Local Ports

- User frontend: `http://localhost:3000`
- Admin frontend: `http://localhost:3002`
- Backend API: `http://localhost:3001`

## Required Deployment Configuration

### User frontend

```bash
NEXT_PUBLIC_API_URL=https://api.focusmate.com
NEXT_PUBLIC_USER_FRONTEND_URL=https://app.focusmate.com
```

### Admin frontend

```bash
NEXT_PUBLIC_API_URL=https://api.focusmate.com
NEXT_PUBLIC_ADMIN_FRONTEND_URL=https://admin.focusmate.com
```

### Backend

```bash
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=focusmate
DB_USER=postgres
DB_PASSWORD=[redacted]
JWT_SECRET=[redacted]
APP_PORT=3001
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=test@example.com
EMAIL_PASS=test123
EMAIL_FROM=test@example.com
```

## Verification Checklist

- Frontends are reachable at production URLs.
- Backend responds successfully.
- CORS includes frontend URLs.
- Database connection is healthy.
- Authentication and core user flows work.

## Troubleshooting

For backend startup failures on Railway, see:
- `docs/deployment/railway-502-troubleshooting.md`
