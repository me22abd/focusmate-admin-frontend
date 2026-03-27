# Railway 502 Troubleshooting

If Railway returns **502 Bad Gateway**, the backend process is usually failing during startup.

## Primary Checks

1. Check Railway deployment logs for the exact startup error.
2. Confirm required variables exist:
   - `DATABASE_URL` (or equivalent DB config)
   - `JWT_SECRET`
   - `NODE_ENV=production`
3. Confirm database service is provisioned and linked.
4. Confirm build/start commands complete without errors.

## Typical Root Causes

- Missing database connection variable.
- Database connection refused/timeout.
- Missing dependency or failed build.
- Port/config mismatch.

## Quick Recovery Steps

1. Redeploy after fixing missing variables.
2. Validate backend starts locally with production-like env values.
3. Recheck service health endpoint and logs.

For full deployment context, see:
- `docs/deployment/deployment-guide.md`
