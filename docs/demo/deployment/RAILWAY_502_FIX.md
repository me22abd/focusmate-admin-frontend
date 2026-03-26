# 🔧 Fix: Railway 502 Bad Gateway - Backend Not Starting

## Problem
Railway shows "Application failed to respond" (502 Bad Gateway). This means the backend application is **crashing on startup** before it can handle requests.

## Root Causes

The most common causes are:

1. **Missing DATABASE_URL** - Backend throws error if DATABASE_URL is not set
2. **Database connection failure** - Can't connect to PostgreSQL
3. **Missing required environment variables** - JWT_SECRET, MAIL_USER, etc.
4. **Build/deployment issue** - `dist/main.js` doesn't exist or is broken
5. **Port mismatch** - Backend not listening on Railway's expected port

## Step 1: Check Railway Logs

**This is the MOST IMPORTANT step** - the logs will tell you exactly why it's failing:

1. Go to: https://railway.app/dashboard
2. Select your backend service
3. Click **Deployments** tab
4. Click on the **latest deployment**
5. Click **View Logs** or check the **Logs** tab
6. Look for error messages, especially:
   - `❌ DATABASE_URL is required`
   - Database connection errors
   - `Error: Cannot find module`
   - Port binding errors
   - Any red error messages

## Step 2: Verify Required Environment Variables

In Railway dashboard → Your service → **Variables** tab, ensure these are set:

### Critical (Required):
- ✅ `DATABASE_URL` - PostgreSQL connection string (Railway auto-provides this if you have a database service)
- ✅ `JWT_SECRET` - Secret key for JWT tokens
- ✅ `NODE_ENV=production`

### Important (May cause startup issues):
- ✅ `MAIL_HOST=smtp.zoho.eu`
- ✅ `MAIL_PORT=465`
- ✅ `MAIL_SECURE=true`
- ✅ `MAIL_USER=support@focusmateapp.app`
- ✅ `MAIL_PASS` - Your Zoho app password
- ✅ `MAIL_FROM="FocusMate Support support@focusmateapp.app"`

### Optional (Won't crash app):
- `SENTRY_DSN` - Error monitoring
- `FIREBASE_PROJECT_ID` - Push notifications
- `OPENAI_API_KEY` - AI features
- `TWILIO_*` - SMS OTP

## Step 3: Check Database Service

1. In Railway dashboard, check if you have a **PostgreSQL database service**
2. If missing, create one:
   - Click **+ New** → **Database** → **Add PostgreSQL**
3. Link it to your backend service:
   - Backend service → **Settings** → **Variables**
   - Railway should auto-inject `DATABASE_URL` if database is linked

## Step 4: Verify Build Process

Check Railway deployment logs for build errors:

1. Look for: `npm run build` output
2. Check for TypeScript compilation errors
3. Verify `dist/main.js` is created
4. Check for missing dependencies

## Step 5: Check Port Configuration

Railway expects the app to listen on the port specified in `PORT` environment variable.

Verify in Railway:
- **Settings** → **Variables** → `PORT` should be set (Railway usually auto-sets this)
- Backend code uses: `process.env.PORT || process.env.APP_PORT || 3001`

## Step 6: Common Fixes

### Fix 1: Missing DATABASE_URL
**Error in logs:** `❌ DATABASE_URL is required but not found`

**Solution:**
1. Create PostgreSQL database in Railway (if not exists)
2. Link database to backend service
3. Railway will auto-inject `DATABASE_URL`
4. Redeploy backend

### Fix 2: Database Connection Failed
**Error in logs:** `ECONNREFUSED` or `Connection timeout`

**Solution:**
1. Verify database service is running
2. Check `DATABASE_URL` format is correct
3. Verify database is linked to backend service
4. Check database service logs

### Fix 3: Build Failed
**Error in logs:** `npm ERR!` or TypeScript errors

**Solution:**
1. Check `package.json` dependencies
2. Verify `npm run build` works locally
3. Check for TypeScript errors
4. Ensure `railway.json` has correct start command

### Fix 4: Module Not Found
**Error in logs:** `Cannot find module '@sentry/node'` or similar

**Solution:**
1. Verify all dependencies are in `package.json`
2. Check `package-lock.json` is committed
3. Railway should run `npm install` automatically
4. Check build logs for installation errors

## Step 7: Test Locally First

Before deploying, test the build locally:

```bash
cd backend

# Set required environment variables
export DATABASE_URL="your-railway-database-url"
export JWT_SECRET="[redacted]"
export NODE_ENV="production"

# Build
npm run build

# Test start
npm run start:prod
```

If this fails locally, fix the issue before deploying to Railway.

## Step 8: Railway-Specific Checks

1. **Service Status**: Should show "Active" (green)
2. **Deployment Status**: Should show "Success" (not "Failed")
3. **Health Check**: Railway may have health check configured - verify it matches `/health` endpoint
4. **Restart Policy**: Check `railway.json` restart policy

## Quick Diagnostic Commands

If you have Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Check environment variables
railway variables
```

## Expected Startup Logs

When backend starts successfully, you should see:

```
✅ Sentry error monitoring initialized (or warning if not set)
🗄️  Database: Using DATABASE_URL (Railway connection)
🔗 Connecting to Railway database: [host]:[port]
🚀 Server running on http://0.0.0.0:[port]
📘 Swagger Docs available at http://localhost:[port]/docs
```

If you see errors before these messages, that's what's causing the 502.

## Most Likely Issue

Based on the code, the **most common cause** is:
- **Missing `DATABASE_URL`** - The app throws an error and exits if DATABASE_URL is not set
- **Database not linked** - Railway database service exists but isn't linked to backend service

**Fix:** Link your PostgreSQL database service to your backend service in Railway.


