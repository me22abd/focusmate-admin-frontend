# Email Setup

This project supports email verification and password reset flows through SMTP configuration.

## Required Backend Variables

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=test@example.com
EMAIL_PASS=test123
EMAIL_FROM=test@example.com
```

## Setup Steps

1. Configure backend email variables in `backend/.env`.
2. Restart backend service.
3. Register a user and verify email delivery.

## Operational Notes

- In development, verification behavior can be validated via logs/test endpoints.
- In production, avoid logging sensitive verification data.

## Quick Verification

```bash
curl "http://localhost:3001/mail/test?to=test@example.com"
```
