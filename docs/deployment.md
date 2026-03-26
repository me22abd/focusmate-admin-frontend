# FocusMate Deployment Guide

## Environment Variables Overview

### Core Environment Variables

| Variable | Description | Local Development | Production Example |
|----------|-------------|-------------------|-------------------|
| `USER_FRONTEND_URL` | User-facing application URL | `http://localhost:3000` | `https://app.focusmate.com` |
| `ADMIN_FRONTEND_URL` | Admin dashboard URL | `http://localhost:3002` | `https://admin.focusmate.com` |
| `API_BASE_URL` | Backend API base URL | `http://localhost:3001` | `https://api.focusmate.com` |

---

## Local Development Setup

### 1. User Frontend (Port 3000)

**Location:** `/frontend`

**Environment Variables:**
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USER_FRONTEND_URL=http://localhost:3000
```

**Start:**
```bash
cd frontend
npm install
npm run dev
```

**Access:** http://localhost:3000

---

### 2. Admin Frontend (Port 3002)

**Location:** `/admin-frontend`

**Environment Variables:**
```bash
# admin-frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ADMIN_FRONTEND_URL=http://localhost:3002
```

**Start:**
```bash
cd admin-frontend
npm install
npm run dev
```

**Access:** http://localhost:3002

---

### 3. Backend API (Port 3001)

**Location:** `/backend`

**Environment Variables:**
```bash
# backend/.env
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

**Start:**
```bash
cd backend
npm install
npm run start:dev
```

**Access:** http://localhost:3001

---

## Vercel Deployment

### Prerequisites

1. **Vercel Account:** Sign up at https://vercel.com
2. **Vercel CLI:** `npm i -g vercel`
3. **GitHub Repository:** Push your code to GitHub

---

### Step 1: Deploy User Frontend

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow prompts to link project
   - Project name: `focusmate-app` (or your choice)
   - Framework: Next.js
   - Root directory: `./` (current directory)

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to: **Project Settings → Environment Variables**
   - Add the following variables:
     ```
     NEXT_PUBLIC_API_URL=https://api.focusmate.com
     NEXT_PUBLIC_USER_FRONTEND_URL=https://app.focusmate.com
     ```
   - **Important:** Select "Production", "Preview", and "Development" environments
   - Click "Save"

5. **Redeploy to apply environment variables:**
   ```bash
   vercel --prod
   ```

6. **Custom Domain (Optional):**
   - Go to: **Project Settings → Domains**
   - Add: `app.focusmate.com`
   - Follow DNS configuration instructions from Vercel
   - Wait for DNS propagation (can take up to 24 hours)

**Result:** User frontend deployed at `https://app.focusmate.com` (or `https://focusmate-app.vercel.app`)

**Vercel URL Format:** `https://[project-name].vercel.app`

---

### Step 2: Deploy Admin Frontend

1. **Navigate to admin-frontend directory:**
   ```bash
   cd admin-frontend
   ```

2. **Deploy as separate project:**
   ```bash
   vercel
   ```
   - **Important:** This is a SEPARATE project from the user frontend
   - Project name: `focusmate-admin` (different from user frontend)
   - Framework: Next.js
   - Root directory: `./`

3. **Set Environment Variables in Vercel Dashboard:**
   - Go to: **Project Settings → Environment Variables**
   - Add the following variables:
     ```
     NEXT_PUBLIC_API_URL=https://api.focusmate.com
     NEXT_PUBLIC_ADMIN_FRONTEND_URL=https://admin.focusmate.com
     ```
   - **Important:** Select "Production", "Preview", and "Development" environments
   - Click "Save"

4. **Redeploy to apply environment variables:**
   ```bash
   vercel --prod
   ```

5. **Custom Domain (Optional):**
   - Go to: **Project Settings → Domains**
   - Add: `admin.focusmate.com`
   - Follow DNS configuration instructions from Vercel
   - Wait for DNS propagation (can take up to 24 hours)

**Result:** Admin frontend deployed at `https://admin.focusmate.com` (or `https://focusmate-admin.vercel.app`)

**Vercel URL Format:** `https://[project-name].vercel.app`

**Note:** The admin frontend is completely separate from the user frontend. They are two different Vercel projects with different URLs.

---

### Step 3: Deploy Backend API

**Option A: Vercel Serverless Functions (Recommended for Next.js)**

If your backend is NestJS, consider deploying to:
- **Railway:** https://railway.app
- **Render:** https://render.com
- **Heroku:** https://heroku.com
- **DigitalOcean App Platform:** https://www.digitalocean.com/products/app-platform

**Option B: Railway Deployment (Example)**

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize project:**
   ```bash
   cd backend
   railway init
   ```

4. **Set Environment Variables:**
   ```bash
   railway variables set DB_HOST=your-db-host
   railway variables set DB_PORT=5432
   railway variables set DB_NAME=focusmate
   railway variables set DB_USER=postgres
   railway variables set DB_PASSWORD=[redacted]
   railway variables set JWT_SECRET=[redacted]
   railway variables set APP_PORT=3001
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get Backend URL:**
   - Railway will provide: `https://your-app.railway.app`
   - Update this in Vercel environment variables

---

## Environment Variable Configuration

### User Frontend (Vercel)

```bash
NEXT_PUBLIC_API_URL=https://api.focusmate.com
NEXT_PUBLIC_USER_FRONTEND_URL=https://app.focusmate.com
```

### Admin Frontend (Vercel)

```bash
NEXT_PUBLIC_API_URL=https://api.focusmate.com
NEXT_PUBLIC_ADMIN_FRONTEND_URL=https://admin.focusmate.com
```

### Backend API (Railway/Render/etc.)

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

**Important:** Update CORS in `backend/src/main.ts` to include production URLs:
```typescript
origin: [
  'https://app.focusmate.com',    // User frontend
  'https://admin.focusmate.com',  // Admin frontend
  // ... other origins
]
```

---

## Post-Deployment Checklist

- [ ] User frontend accessible at production URL
- [ ] Admin frontend accessible at production URL
- [ ] Backend API accessible and responding
- [ ] CORS configured for production URLs
- [ ] Database connection working
- [ ] Email service configured
- [ ] User login working
- [ ] Admin login working
- [ ] SSL certificates valid (HTTPS)
- [ ] Environment variables set correctly

---

## Troubleshooting

### CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
1. Check backend CORS configuration includes frontend URLs
2. Verify `API_BASE_URL` environment variable is correct
3. Check browser console for specific CORS error

### 401 Unauthorized

**Problem:** Login fails after deployment

**Solution:**
1. Verify `JWT_SECRET` is set in backend
2. Check token expiration settings
3. Ensure cookies/headers are being sent correctly

### Database Connection Failed

**Problem:** Backend can't connect to database

**Solution:**
1. Verify database credentials in environment variables
2. Check database is accessible from deployment platform
3. Whitelist deployment platform IP in database firewall

---

## Quick Reference

| Service | Local URL | Production URL |
|---------|-----------|----------------|
| User Frontend | http://localhost:3000 | https://app.focusmate.com |
| Admin Frontend | http://localhost:3002 | https://admin.focusmate.com |
| Backend API | http://localhost:3001 | https://api.focusmate.com |









