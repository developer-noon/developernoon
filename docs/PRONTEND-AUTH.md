Act as a Staff Frontend Engineer and Security Auditor. I need you to build a bulletproof, edge-case-hardened Authentication UI flow using React (18+), TypeScript, and Tailwind CSS. This system must connect perfectly to our Express/MongoDB backend and gracefully handle every conceivable client, server, and network error.

Generate the code based on these absolute architectural rules:

1. Advanced Axios Client & Fail-Safe Token Rotator:
   - Create a central Axios instance with `withCredentials: true` and `headers: { 'Content-Type': 'application/json' }`.
   - Implement a robust Response Interceptor to manage the 401 token refresh loop:
     - If an API call fails with 401 and the error indicates an expired access token, queue the original request, flag that a refresh is in progress, and hit `POST /api/auth/refresh`.
     - If the refresh succeeds, replay all queued requests with the new session.
     - If the refresh fails (401/403 or network drop), wipe global auth state, clear local memories, and redirect to `/login` with an alert message: "Session expired. Please log in again."
     - Prevent infinite refresh loops by tracking retry attempts per request (max 1 retry).

2. Defensive Global Auth Context & Initial Hydration:
   - Create an `AuthContext` managing states: `user` (object or null), `isAuthenticated` (boolean), `isInitialLoading` (boolean), and `globalNetworkError` (string or null).
   - Upon initial mount, run an automatic background session check (e.g., hitting a `/api/users/me` or `/api/health` profile endpoint).
   - Ensure a robust application-wide "Loading Screen" renders while `isInitialLoading` is true, preventing unauthenticated view flickering or layout shifts.

3. Complete "All-Scenario" UI Forms & Edge-Case Views:
   All screens must be beautifully styled with Tailwind, use semantic HTML, feature explicit input labels, accessible focus rings, and clear error callouts.
   - SIGNUP VIEW:
     - Validates input client-side (RFC-compliant email, password strong criteria).
     - Handles 400 (Email already exists) gracefully by highlighting the field red.
     - Success State: Replaces the form entirely with an explicit illustration/icon layout and text: "Verification Email Sent! Please check your inbox at [email] and click the link to activate your account."
   - EMAIL VERIFICATION VIEW (Route: `/verify-email`):
     - Instantly extracts the token from URL parameters on mount.
     - Shows a processing loading spinner ("Verifying your email...").
     - Success State: Renders a large green checkmark, a success message, and a "Proceed to Login" button.
     - Failure State (Token expired/invalid): Displays an error message with a "Resend Verification Link" utility input and button.

   - LOGIN VIEW:
     - Captures form submission, tracking specific backend response messages.
     - CRITICAL SCENARIO: If the backend returns a 401 error explicitly stating "Please verify your email before logging in", catch this case uniquely. Do not just show a red alert; render an explicit warning banner that includes a clickable action text: "Didn't receive it? Click here to resend verification email."
     - Handles Rate Limiting (Too Many Requests - 429): Locks the form inputs and displays a countdown or a specialized alert: "Too many attempts. Please wait a few minutes before trying again."

   - FORGOT & RESET PASSWORD VIEWS:
     - Forgot Form: Displays uniform user-facing text regardless of whether the email exists in the DB (prevents account enumeration vulnerability): "If that email matches an account, a secure reset link has been dispatched."
     - Reset Form: Extracts token, forces matching password inputs, handles expired/invalid token states by redirecting back to forgot-password with a corresponding error flash.

   - SECURE DASHBOARD VIEW (Protected View):
     - Standard view showing user info.
     - Features a "Logout" button that hits `POST /api/auth/logout`. On response, wipes user context and drops the user back to the `/login` clean slate.

4. Form UX & Interaction Boundaries:
   - Every submit button must disable instantly upon click and display a loading spinner state (e.g., "Logging in...") to eliminate double-submitting data.
   - If a global network error occurs (Axios code `ERR_NETWORK` or status 503), catch it globally and show an offline toast notification or top banner: "Network disconnected. Please check your internet connection."
   - Sanitize UI text renderings to protect against unexpected HTML string injection.

Provide the complete file structures, fully written with zero shortcuts or placeholders.
