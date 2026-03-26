# FocusMate Environment Variables Guide

## Core Environment Variables

### USER_FRONTEND_URL
**Description:** User-facing application URL  
**Local Development:** `http://localhost:3000`  
**Production:** `https://app.focusmate.com` (or your Vercel URL)  
**Used By:** User frontend for redirects, OAuth callbacks  
**Config File:** `frontend/.env.local`  
**Variable Name:** `NEXT_PUBLIC_USER_FRONTEND_URL`

---

### ADMIN_FRONTEND_URL
**Description:** Admin dashboard URL  
**Local Development:** `http://localhost:3002`  
**Production:** `https://admin.focusmate.com` (or your Vercel URL)  
**Used By:** Admin frontend for redirects  
**Config File:** `admin-frontend/.env.local`  
**Variable Name:** `NEXT_PUBLIC_ADMIN_FRONTEND_URL`

---

### API_BASE_URL
**Description:** Backend API base URL  
**Local Development:** `http://localhost:3001`  
**Production:** `https://api.focusmate.com` (or your backend URL)  
**Used By:** Both frontends to connect to backend API  
**Config File:** Both `frontend/.env.local` and `admin-frontend/.env.local`  
**Variable Name:** `NEXT_PUBLIC_API_URL`

---

## Local Development Configuration

### User Frontend (`frontend/.env.local`)

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# User Frontend URL (for redirects)
NEXT_PUBLIC_USER_FRONTEND_URL=http://localhost:3000
```

### Admin Frontend (`admin-frontend/.env.local`)

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Admin Frontend URL (for redirects)
NEXT_PUBLIC_ADMIN_FRONTEND_URL=http://localhost:3002
```

### Backend (`backend/.env`)

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=focusmate
DB_USER=postgres
DB_PASSWORD=[redacted]

# JWT
JWT_SECRET=[redacted]

# Server
APP_PORT=3001

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=test@example.com
EMAIL_PASS=test123
EMAIL_FROM=test@example.com
```

---

## Production Configuration (Vercel)

### User Frontend (Vercel Environment Variables)

Go to: **Project Settings → Environment Variables**

```bash
NEXT_PUBLIC_API_URL=https://api.focusmate.com
NEXT_PUBLIC_USER_FRONTEND_URL=https://app.focusmate.com
```

### Admin Frontend (Vercel Environment Variables)

Go to: **Project Settings → Environment Variables**

```bash
NEXT_PUBLIC_API_URL=https://api.focusmate.com
NEXT_PUBLIC_ADMIN_FRONTEND_URL=https://admin.focusmate.com
```

### Backend (Railway/Render/etc. Environment Variables)

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

**Important:** Update backend CORS in `backend/src/main.ts` to include:
```typescript
origin: [
  'https://app.focusmate.com',    // User frontend
  'https://admin.focusmate.com',  // Admin frontend
  // ... other origins
]
```

---

## Port Configuration Summary

| Service | Port | Local URL | Production URL |
|---------|------|-----------|----------------|
| User Frontend | 3000 | http://localhost:3000 | https://app.focusmate.com |
| Admin Frontend | 3002 | http://localhost:3002 | https://admin.focusmate.com |
| Backend API | 3001 | http://localhost:3001 | https://api.focusmate.com |

---

## Quick Setup Commands

### Create Local Environment Files

**User Frontend:**
```bash
cd frontend
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USER_FRONTEND_URL=http://localhost:3000
EOF
```

**Admin Frontend:**
```bash
cd admin-frontend
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ADMIN_FRONTEND_URL=http://localhost:3002
EOF
```

---

## Verification

After setting environment variables, verify they're loaded:

**User Frontend:**
```bash
cd frontend
npm run dev
# Check browser console for API URL logs
```

**Admin Frontend:**
```bash
cd admin-frontend
npm run dev
# Check browser console for "🔵 Admin API Configuration" logs
```

---

## Troubleshooting

### Environment Variables Not Loading

1. **Restart dev server** after changing `.env.local`
2. **Check variable names** - must start with `NEXT_PUBLIC_` for client-side access
3. **Verify file location** - `.env.local` must be in the frontend root directory
4. **Check for typos** - variable names are case-sensitive

### CORS Errors

1. **Verify backend CORS** includes your frontend URLs
2. **Check API_BASE_URL** matches your backend URL
3. **Ensure credentials: true** in axios configuration

### Connection Refused

1. **Verify backend is running** on port 3001
2. **Check firewall** isn't blocking connections
3. **Verify hostname** in API URL matches backend hostname









