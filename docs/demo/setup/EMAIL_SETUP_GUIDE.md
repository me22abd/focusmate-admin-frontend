# 📧 Email Verification Setup Guide

## 1. Email Provider Recommendation

**✅ Use Gmail SMTP** - This is the simplest option and matches your current backend configuration.

**Why Gmail?**
- Your backend is already configured for Gmail (`service: 'gmail'`)
- Free and reliable
- Easy to set up with App Passwords
- No additional services needed
- Works immediately after configuration

**Alternative Options** (if you prefer):
- **Resend** - Modern, developer-friendly (requires code changes)
- **SendGrid** - Professional, requires account setup (requires code changes)
- **Mailgun** - Good for production (requires code changes)

**Recommendation: Stick with Gmail** since your backend is already configured for it.

---

## 2. Gmail Setup Steps

### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the prompts to enable it (you'll need your phone)

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "Focusmate Backend" as the name
5. Click **Generate**
6. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **You can only see this once!** Save it immediately.

---

## 3. Environment File Configuration

### Which File to Edit?
**Edit `/backend/.env`** - This is the main environment file.

You have these files:
- `.env` ✅ **Edit this one**
- `.env.local` (optional, for local overrides)
- `.env.backup` (backup, don't edit)
- `.env.test` (for testing, don't edit)

### Exact .env Format

Add or update these lines in `/backend/.env`:

```bash
# 📧 EMAIL CONFIGURATION (Gmail SMTP)
EMAIL_USER=test@example.com
EMAIL_PASS=test123
MAIL_FROM=test@example.com
```

**Example:**
```bash
# 📧 EMAIL CONFIGURATION (Gmail SMTP)
EMAIL_USER=test@example.com
EMAIL_PASS=test123
MAIL_FROM=test@example.com
```

**Important Notes:**
- `EMAIL_USER` = Your full Gmail address
- `EMAIL_PASS` = The 16-character App Password (can include spaces or remove them)
- `MAIL_FROM` = Usually the same as EMAIL_USER (this is the "From" address in emails)

**Alternative Variable Names (also supported):**
The backend also checks for `MAIL_USER` and `MAIL_PASS` if `EMAIL_USER`/`EMAIL_PASS` are not found.

---

## 4. Restart Backend

**✅ YES, you MUST restart the backend** after updating `.env`:

1. Stop the backend (Ctrl+C in the terminal where it's running)
2. Start it again:
   ```bash
   cd backend
   npm run start:dev
   ```

**Why?** Environment variables are loaded when the app starts. Changes won't take effect until restart.

---

## 5. Verification Flow Confirmation

### ✅ New Users
1. User registers → Backend sends verification code immediately
2. User receives email with 6-digit code
3. User enters code → Email verified
4. User can now log in

### ✅ Existing Unverified Users
1. User tries to log in → Blocked with "Email not verified"
2. User redirected to `/verify-email`
3. User enters email → Receives verification code
4. User enters code → Email verified
5. User can now log in

### ✅ Verified Users
1. User logs in normally → No verification required
2. Dashboard loads immediately

### ✅ Resend Email
1. User clicks "Resend code" → Backend sends new code
2. 30-second cooldown prevents spam
3. Button disabled during cooldown with countdown
4. After cooldown → Can resend again

### ✅ Backend Logs
When you send a verification code, you'll see:
```
📧 Mail configuration check:
   MAIL_USER: SET ✅
   MAIL_PASS: SET ✅
   MAIL_FROM: test@example.com
🔐 sendEmailVerificationCode called for: user@example.com
✅ User found: John Doe (ID: abc123)
📧 Current verification status: false
🔢 Generated verification code: 123456
💾 Code saved to database for user: abc123
📧 Attempting to send verification email to: user@example.com
✅ Email sent successfully to user@example.com
✅ Verification email sent successfully to user@example.com
```

---

## 6. Production vs Development Behavior

### Development Mode (`NODE_ENV=development`)
- ✅ **Codes ARE logged to console** for testing
- ✅ Email is still sent (if configured)
- ✅ If email fails, code is shown in console logs
- ✅ Look for: `📧 DEVELOPMENT MODE: Verification code for [email]`

### Production Mode (`NODE_ENV=production`)
- ❌ **Codes are NOT logged to console**
- ✅ **Only real emails are sent**
- ❌ If email fails, error is thrown (no console code)
- ✅ Secure - no code exposure

**Current Code Behavior:**
```typescript
// In development, log the code so user can still test
if (process.env.NODE_ENV === 'development') {
  console.log(`📧 Verification code for ${email}: ${code}`);
  return { code: code, ... }; // Only in dev
}
// In production, throw error if email fails
throw new BadRequestException('Failed to send verification email');
```

---

## 7. Testing Checklist

After setup, test this flow:

### Test 1: New User Registration
- [ ] Register new user
- [ ] Check email inbox for verification code
- [ ] Check backend logs for "Email sent successfully"
- [ ] Enter code → Should verify
- [ ] Try logging in → Should work

### Test 2: Existing Unverified User
- [ ] Try logging in with unverified account
- [ ] Should be redirected to `/verify-email`
- [ ] Enter email → Should receive code
- [ ] Enter code → Should verify
- [ ] Try logging in again → Should work

### Test 3: Resend Functionality
- [ ] Click "Resend code"
- [ ] Should show loading state
- [ ] Should receive new code in email
- [ ] Button should be disabled for 30 seconds
- [ ] Countdown should show "Resend in Xs"
- [ ] After 30s, button should be enabled again

### Test 4: Verified User Login
- [ ] Log in with verified account
- [ ] Should go directly to dashboard
- [ ] No verification required

---

## 8. Troubleshooting

### Problem: "Email not sent" or "Failed to send email"

**Check 1: Environment Variables**
```bash
# In backend directory, check if variables are loaded:
cd backend
cat .env | grep EMAIL
```

**Check 2: Backend Logs**
Look for:
```
📧 Mail configuration check:
   MAIL_USER: SET ✅  ← Should be SET
   MAIL_PASS: SET ✅  ← Should be SET
```

If you see `NOT SET ❌`, your `.env` file isn't being read correctly.

**Check 3: Gmail App Password**
- Make sure you're using the **App Password**, not your regular Gmail password
- App Password is 16 characters (may have spaces)
- Make sure 2-Step Verification is enabled

**Check 4: Gmail Security**
- Check if Gmail blocked the login attempt
- Go to https://myaccount.google.com/security
- Check "Recent security activity" for blocked sign-ins

### Problem: "User not found" when sending code

- Make sure the email exists in your database
- Check backend logs for: `❌ User not found for email: [email]`
- User must be registered first

### Problem: Codes not appearing in development

- Check backend console logs
- Look for: `📧 DEVELOPMENT MODE: Verification code for [email]`
- Make sure `NODE_ENV=development` is set

---

## 9. Quick Start Summary

1. **Enable 2-Step Verification** on Gmail
2. **Generate App Password** at https://myaccount.google.com/apppasswords
3. **Edit `/backend/.env`** and add:
   ```bash
   EMAIL_USER=test@example.com
   EMAIL_PASS=test123
   MAIL_FROM=test@example.com
   ```
4. **Restart backend** (stop and start again)
5. **Test** by registering a new user
6. **Check email** for verification code
7. **Check backend logs** for confirmation

---

## 10. Security Notes

- ✅ App Passwords are safer than regular passwords
- ✅ Codes expire after 10 minutes
- ✅ 30-second cooldown prevents spam
- ✅ Codes are hashed in database (not stored in plain text)
- ✅ In production, codes are never logged
- ✅ Only verified users can log in

---

**Need Help?** Check backend logs for detailed error messages. All email operations are logged with emoji indicators (📧, ✅, ❌) for easy debugging.

















