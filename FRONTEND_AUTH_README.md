# Frontend Authentication System

A production-ready, edge-case hardened authentication UI built with Next.js 16+, React 19+, TypeScript, and Tailwind CSS.

## Architecture

### Core Components

**Axios Client** (`lib/axios.ts`)
- Centralized HTTP client with `withCredentials: true`
- Response interceptor with token refresh logic
- Prevents infinite refresh loops with retry tracking
- Handles network errors gracefully
- Queue system for concurrent requests during refresh

**Auth Context** (`context/AuthContext.tsx`)
- Global auth state: user, isAuthenticated, isInitialLoading, globalNetworkError
- Automatic session check on app mount
- All auth methods: login, signup, logout, verify email, forgot password, reset password
- Network error detection and propagation

**Auth Hook** (`hooks/useAuth.ts`)
- Simple hook to access auth context
- Type-safe with full TypeScript support

### UI Components

**LoadingScreen** - Displayed while session is being verified on app startup
**NetworkErrorBanner** - Top banner alert for network disconnection errors
**SignupForm** - Registration with validation and email verification success state
**LoginForm** - Login with email verification check and rate limit detection
**EmailVerification** - Automatic email verification with token processing
**ForgotPasswordForm** - Secure password reset request (prevents account enumeration)
**ResetPasswordForm** - Reset password with token validation
**Dashboard** - Protected user profile and logout
**LayoutContent** - Wrapper that manages loading and error states

### Auth Pages

- `/auth/login` - Login page
- `/auth/signup` - Signup/registration page
- `/auth/verify-email` - Email verification (token from URL)
- `/auth/forgot-password` - Password recovery request
- `/auth/reset-password` - Password reset with token (token from URL)
- `/dashboard` - Protected dashboard (requires authentication)

## Setup

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure Environment

Create `.env.local` file:

```bash
# Backend API endpoint
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Security Features

✅ **XSS Protection**
- No localStorage for tokens
- HttpOnly cookies managed by backend
- Sanitized HTML rendering

✅ **CSRF Prevention**
- withCredentials: true for cookie inclusion
- SameSite cookies configured on backend

✅ **Account Enumeration Protection**
- Forgot password shows same message for all emails
- Signup doesn't reveal if email exists

✅ **Token Management**
- Automatic token refresh with queue system
- No infinite refresh loops (max 1 retry per request)
- Graceful session expiration handling

✅ **Rate Limiting**
- Detects 429 responses
- Disables form during rate limit period
- Shows countdown timer

✅ **Input Validation**
- Email validation with RFC compliance
- Password strength requirements
- Client-side validation before submission

## Key Flows

### Login Flow
1. User enters credentials
2. Form validates client-side
3. Submits to backend
4. Backend returns user object (if email verified) or 401 error
5. Special handling for "email not verified" scenario
6. Sets cookies and redirects to dashboard

### Signup Flow
1. User fills registration form
2. Validates password strength and matching
3. Submits to backend
4. Backend sends verification email (mocked as console log)
5. Shows success state with email display
6. User clicks link in email to verify

### Email Verification Flow
1. User clicks link in email with token
2. Page loads with token from URL query param
3. Shows loading spinner
4. Automatically submits token to backend
5. Shows success or failure state
6. Can resend if token expired

### Password Reset Flow
1. User enters email on forgot page
2. Backend sends reset link (prevents enumeration)
3. User clicks reset link with token
4. Page loads and shows reset form
5. User enters new password
6. Submits and redirects to login

### Token Refresh Flow
1. API call returns 401
2. Interceptor detects expired access token
3. Queues original request
4. Calls `/api/auth/refresh` endpoint
5. Replays all queued requests with new token
6. Or redirects to login if refresh fails

## Error Handling

### Backend Errors (400, 401, 429, 500)
- Parsed from response body
- Displayed in alert or banner
- Form remains usable for retry

### Network Errors
- Detected via `ERR_NETWORK` or 503 status
- Shows top banner: "Network disconnected. Please check your internet connection."
- Dismissible
- Auto-dismissed on reconnection

### Rate Limiting (429)
- Countsdown until next attempt allowed
- Form inputs disabled
- Shows time remaining

## Component API

### useAuth Hook
```typescript
const {
  user,                    // User object or null
  isAuthenticated,         // Boolean
  isInitialLoading,        // Boolean (true while checking session)
  globalNetworkError,      // Error string or null
  login,                   // (email, password) => Promise
  signup,                  // (email, password) => Promise
  logout,                  // () => Promise
  verifyEmail,            // (token) => Promise
  forgotPassword,         // (email) => Promise
  resetPassword,          // (token, password) => Promise
  checkSession,           // () => Promise
  clearNetworkError,      // () => void
} = useAuth();
```

### AuthContext
Provides all methods and state listed above to components.

## Testing Flows

### Test Signup
1. Go to `http://localhost:3000/auth/signup`
2. Register with test email
3. See success state
4. Backend logs verification link to console

### Test Email Verification
1. Copy verification token from backend console log
2. Go to `http://localhost:3000/auth/verify-email?token={token}`
3. Should show success after token processing

### Test Login
1. Go to `http://localhost:3000/auth/login`
2. Try unverified email → See "Please verify your email" message
3. Try invalid credentials → See "Invalid email or password"
4. Try verified email → See dashboard

### Test Password Reset
1. Go to `http://localhost:3000/auth/forgot-password`
2. Enter email → Shows "Check your email" message (regardless if email exists)
3. Copy reset token from backend console log
4. Go to `http://localhost:3000/auth/reset-password?token={token}`
5. Enter new password and confirm
6. Should redirect to login with success message

### Test Rate Limiting
1. Login 5 times with wrong password in 15 minutes
2. Next attempt should show countdown timer
3. Form should be disabled

### Test Network Error
1. Stop backend server
2. Try any API call
3. Should show "Network disconnected" banner

## File Structure

```
frontend/
├── app/
│   ├── page.tsx                 # Redirects to login/dashboard
│   ├── layout.tsx              # Root layout with AuthProvider
│   ├── globals.css             # Tailwind styles
│   └── auth/
│       ├── login/page.tsx
│       ├── signup/page.tsx
│       ├── verify-email/page.tsx
│       ├── forgot-password/page.tsx
│       └── reset-password/page.tsx
│   └── dashboard/page.tsx
├── components/
│   ├── LoadingScreen.tsx
│   ├── NetworkErrorBanner.tsx
│   ├── SignupForm.tsx
│   ├── LoginForm.tsx
│   ├── EmailVerification.tsx
│   ├── ForgotPasswordForm.tsx
│   ├── ResetPasswordForm.tsx
│   ├── Dashboard.tsx
│   └── LayoutContent.tsx
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── axios.ts                # Axios instance with interceptors
│   └── validation.ts           # Input validation utilities
├── .env.local                  # Local environment (git ignored)
└── .env.example               # Environment template
```

## Backend Integration

Ensure backend is running on `http://localhost:5000` with these endpoints:

```
POST   /api/auth/signup              # Register user
GET    /api/auth/verify-email        # Verify with token
POST   /api/auth/login               # Login user
POST   /api/auth/logout              # Logout
POST   /api/auth/forgot-password     # Request password reset
POST   /api/auth/reset-password      # Reset password with token
POST   /api/auth/refresh             # Refresh access token
GET    /api/health                   # Health check
```

See `backend/README.md` for backend setup.

## Performance Optimizations

✅ Code splitting with dynamic imports
✅ Image optimization with Next.js Image component
✅ CSS-in-JS with Tailwind (no runtime overhead)
✅ Efficient re-renders with proper React hooks dependencies
✅ Memoization where needed

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires cookies and JavaScript enabled.

## Troubleshooting

### "Cannot connect to backend"
- Check backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

### "Session expires immediately"
- Check JWT_EXPIRE setting in backend
- Verify token refresh endpoint works
- Check browser cookie settings

### "Form buttons disabled"
- Check for network errors (banner at top)
- Try refreshing page
- Check browser console for errors

### "Email not verified error"
- Verify user manually in MongoDB: `db.users.updateOne({email: "user@test.com"}, {$set: {isVerified: true}})`
- Or click verification link from console log

## Production Deployment

1. Build project:
   ```bash
   npm run build
   ```

2. Update `NEXT_PUBLIC_API_URL` to production API URL

3. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel deploy
   ```

4. Or deploy manually:
   ```bash
   npm run build
   npm run start
   ```

## Development

### Add New Auth Route
1. Create page in `app/auth/{route}/page.tsx`
2. Create form component in `components/{RouteForm}.tsx`
3. Add method to `AuthContext` if needed
4. Use `useAuth` hook in form

### Modify Validation Rules
Edit `lib/validation.ts` functions:
- `validateEmail()` - Email format
- `validatePassword()` - Password requirements
- `sanitizeHtml()` - XSS protection

### Extend User Model
Update `AuthContext` User interface and handle in components

## Support

For issues or questions, refer to backend logs:
- Frontend errors: Browser console
- Backend errors: Terminal where backend is running
- API responses: Network tab in DevTools

## License

Private - Developer Noon
