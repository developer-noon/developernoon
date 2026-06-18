Act as a Principal Backend Engineer and Security Architect. I need a robust, fully production-ready Authentication and Authorization system using Node.js (Express), MongoDB (Mongoose), and JSON Web Tokens (JWT). This must cover all real-world edge cases and account recovery scenarios.

Please provide the code adhering to these strict specifications:

1. Architecture & Security Middlware:
   - Use a modular folder structure: /models, /controllers, /routes, /middleware, /utils.
   - Implement 'express-rate-limit' to prevent brute-force attacks on login/signup and forgot-password routes.
   - Use centralized error handling middleware to catch async errors and avoid server crashes.

2. Enhanced MongoDB User Schema:
   - Fields: email (unique, indexed, lowercase), password (hashed), isVerified (boolean, default false), verificationToken (string), verificationTokenExpire (date), passwordResetToken (string), passwordResetExpire (date).
   - Use a Mongoose pre-save hook to automatically hash passwords with bcrypt (10 rounds) only if modified.
   - Add instance methods for: .comparePassword(candidate), .createVerificationToken(), and .createPasswordResetToken() (using crypto.randomBytes).

3. All Scenario Controllers & Routes:
   - SIGNUP: Validate email/password format, check duplicates, generate verificationToken, save user, send a mock verification email (log to console), and set HttpOnly cookies.
   - VERIFY EMAIL: Accept token via GET request, match against DB, check expiration, mark isVerified=true, clear token fields, and save.
   - LOGIN: Enforce credential checking. Reject unverified accounts if business logic requires it, update tokens, and set HttpOnly cookies.
   - LOGOUT: Instantly clear all auth cookies from the client browser.
   - FORGOT PASSWORD: Accept email, generate secure passwordResetToken, save hashed token + 10-minute expiry to DB, and log a mock reset link containing the unhashed token.
   - RESET PASSWORD: Accept unhashed token via URL parameter and newPassword via body. Hash the incoming token, look up the user, verify expiry, hash the new password, clear reset fields, and save.

4. Token Management (Dual-Token System):
   - Do NOT store tokens in localStorage (XSS vulnerable).
   - Issue a short-lived Access Token (e.g., 15m) and a longer-lived Refresh Token (e.g., 7d).
   - Store both in separate, secure HttpOnly, Secure, SameSite=Strict cookies.
   - Create a /refresh route that reads the Refresh Token, validates it, and issues a fresh Access Token cookie.

5. Authentication Middleware:
   - Create a 'protect' middleware that reads the Access Token cookie, verifies it, extracts the user ID, fetches the user from the database (minus the password), and attaches the user to `req.user`.
   - If the Access Token is expired but the Refresh Token is valid, instruct how the frontend should hit the /refresh endpoint.

Provide the complete file contents cleanly separated, using modern, secure patterns. No conversational fluff, just clean, secure code.
