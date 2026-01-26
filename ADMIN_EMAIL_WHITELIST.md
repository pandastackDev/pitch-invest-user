# Admin Email Whitelist Configuration

## Overview
The admin authentication system is now configured via environment variables, making it easy to manage allowed admin emails without modifying source code.

## Configuration

### Local Development (.env)
```bash
# Comma-separated list of allowed admin emails (no spaces around commas)
VITE_ALLOWED_ADMIN_EMAILS=jetton9564@gmail.com,pechymdomingos@gmail.com
```

### Production (.env.production)
```bash
# Comma-separated list of allowed admin emails (no spaces around commas)
VITE_ALLOWED_ADMIN_EMAILS=jetton9564@gmail.com,pechymdomingos@gmail.com
```

### Vercel/Netlify Deployment
Add this environment variable in your deployment platform:
- **Key**: `VITE_ALLOWED_ADMIN_EMAILS`
- **Value**: `jetton9564@gmail.com,pechymdomingos@gmail.com`

## Adding/Removing Admin Emails

### To Add a New Admin:
1. Open `.env` (local) or `.env.production` (production)
2. Add the email to the comma-separated list:
   ```bash
   VITE_ALLOWED_ADMIN_EMAILS=jetton9564@gmail.com,pechymdomingos@gmail.com,newadmin@example.com
   ```
3. **Important**: No spaces around commas!
4. Restart the dev server: `npm run dev`

### To Remove an Admin:
1. Open `.env` file
2. Remove the email from the list
3. Restart the dev server

## How It Works

The system uses a centralized utility function in `src/lib/allowedEmails.ts`:

```typescript
import { isEmailAllowed, getAllowedEmails } from '../../lib/allowedEmails';

// Check if email is allowed
if (!isEmailAllowed(userEmail)) {
  // Access denied
}

// Get all allowed emails
const allowedEmails = getAllowedEmails();
```

## Security Features

✅ **Case-insensitive matching** - "Admin@Example.com" matches "admin@example.com"
✅ **Automatic trimming** - Extra spaces are removed
✅ **Multi-layer protection** - Validates at:
  - Password login
  - OTP/Magic link login
  - OAuth callback (Google/LinkedIn)
  - Registration (email & OAuth)

## Protected Files

The following authentication files enforce the whitelist:
- `src/pages/Authentication/Login.tsx` - Login page
- `src/pages/Authentication/Callback.tsx` - OAuth callback
- `src/pages/Authentication/Register.tsx` - Registration page

## Error Messages

| Scenario | User Sees |
|----------|-----------|
| **No .env configured** | "Admin access is not configured. Please contact support." |
| **Unauthorized email** | "Access denied. This email is not authorized to sign in." |
| **Authorized email** | ✅ Login successful |

## Testing

### Test Authorized Access:
```bash
# Login with:
Email: jetton9564@gmail.com
Password: [your password]
```
✅ Should succeed

### Test Unauthorized Access:
```bash
# Login with:
Email: unauthorized@example.com
Password: anything
```
❌ Should show: "Access denied. This email is not authorized to sign in."

## Troubleshooting

### Issue: "Admin access is not configured"
**Solution**: 
1. Check `.env` file exists in project root
2. Verify `VITE_ALLOWED_ADMIN_EMAILS` is set
3. Restart dev server: `npm run dev`

### Issue: Authorized email is denied
**Solution**:
1. Check for typos in email address
2. Verify no extra spaces in `.env` file
3. Ensure email is lowercase in `.env`
4. Restart dev server

### Issue: Changes not reflecting
**Solution**:
1. Stop dev server (Ctrl+C)
2. Run `npm run dev` again
3. Clear browser cache/storage
4. Try incognito mode

## Important Notes

⚠️ **Always restart dev server** after changing `.env` files
⚠️ **No spaces around commas** in email list
⚠️ **Update both** `.env` and `.env.production` for consistency
⚠️ **Don't commit** `.env` to version control (it's in .gitignore)
⚠️ **Update deployment platform** environment variables after production changes

## Example Configurations

### Single Admin:
```bash
VITE_ALLOWED_ADMIN_EMAILS=admin@example.com
```

### Multiple Admins:
```bash
VITE_ALLOWED_ADMIN_EMAILS=admin1@example.com,admin2@example.com,admin3@example.com
```

### Development vs Production:
```bash
# .env (development)
VITE_ALLOWED_ADMIN_EMAILS=dev@example.com,test@example.com

# .env.production (production)
VITE_ALLOWED_ADMIN_EMAILS=admin@example.com,superadmin@example.com
```

---

**Last Updated**: January 21, 2026
