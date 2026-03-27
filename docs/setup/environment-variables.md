# Environment Variables

## Frontend (User) - `frontend/.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USER_FRONTEND_URL=http://localhost:3000
```

## Frontend (Admin) - `admin-frontend/.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ADMIN_FRONTEND_URL=http://localhost:3002
```

## Backend - `backend/.env`

```bash
DB_HOST=localhost
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

## Production Values

Use environment-specific hostnames and secrets, and keep all secrets out of source control.
