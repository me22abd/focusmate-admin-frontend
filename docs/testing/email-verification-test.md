# Email Verification Test

## Test Steps

1. Start backend and frontend.
2. Register with:
   - Email: `test@example.com`
   - Password: `test123`
3. Confirm verification email delivery.

## Optional Endpoint Check

```bash
curl "http://localhost:3001/mail/test?to=test@example.com"
```

## Expected Result

- Backend returns success for mail test endpoint.
- Verification flow completes successfully from UI.
