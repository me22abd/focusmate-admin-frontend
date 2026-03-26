# Email verification test

Use these steps to verify that outbound email is working in a local environment.

## Test flow

1. Start the backend and frontend.
2. Register a new user:
   - **Email**: `test@example.com`
   - **Password**: `test123`
3. Confirm that a verification email is delivered to the configured sender inbox (or a configured test mailbox).

## Optional: test endpoint

```bash
curl "http://localhost:3001/mail/test?to=test@example.com"
```

If the request succeeds, the backend should respond with a success message.

















