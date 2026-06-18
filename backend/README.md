# DeveloperNoon Authentication Backend

A production-ready authentication system built with Express, MongoDB, and JWT.

## Features

✓ **Security**

- Bcryptjs password hashing (10 rounds)
- JWT-based authentication with dual-token system
- HttpOnly, Secure, SameSite cookies
- Rate limiting on sensitive endpoints
- Centralized error handling

✓ **Authentication**

- User signup with email verification
- Email verification with secure tokens (24-hour expiry)
- Secure login with credential validation
- Password reset with time-limited tokens (10 minutes)
- Access token refresh mechanism (15m + 7d)
- Session logout

✓ **Database**

- MongoDB with Mongoose ODM
- Indexed email field for performance
- Token expiration handling
- Automatic password hashing on save

## Setup

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required environment variables:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

### 3. Start Development Server

```bash
npm run dev
```

Server will run at `http://localhost:5000`

### 4. API Endpoints

#### Public Routes

**POST /api/auth/signup**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**GET /api/auth/verify-email?token={token}**

- Verify email address with token sent to inbox

**POST /api/auth/login**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**POST /api/auth/forgot-password**

```json
{
  "email": "user@example.com"
}
```

**POST /api/auth/reset-password?token={token}**

```json
{
  "password": "newpassword123",
  "passwordConfirm": "newpassword123"
}
```

**POST /api/auth/refresh**

- Refresh access token (uses httpOnly cookie)

#### Protected Routes (require valid accessToken cookie)

**POST /api/auth/logout**

- Logout and clear authentication cookies

## Token System

### Access Token

- Expiry: 15 minutes
- Storage: HttpOnly cookie (XSS safe)
- Usage: Authorization header or cookie

### Refresh Token

- Expiry: 7 days
- Storage: HttpOnly cookie (XSS safe)
- Usage: Obtain new access token via `/refresh` endpoint

## Security Features

1. **Password Security**
   - Hashed with bcryptjs (10 salt rounds)
   - Never returned in API responses
   - Minimum 6 characters required

2. **Token Security**
   - Stored in HttpOnly cookies (prevents XSS)
   - Secure flag (HTTPS only in production)
   - SameSite=Strict (prevents CSRF)

3. **Rate Limiting**
   - Login: 5 attempts per 15 minutes
   - Signup: 3 per hour per IP
   - Password Reset: 3 per 15 minutes

4. **Error Handling**
   - Centralized error middleware
   - Consistent error response format
   - No stack traces exposed in production

## Database Schema

### User Model

```
email (String, unique, lowercase, indexed)
password (String, hashed)
isVerified (Boolean, default: false)
verificationToken (String)
verificationTokenExpire (Date)
passwordResetToken (String)
passwordResetExpire (Date)
timestamps (createdAt, updatedAt)
```

## Architecture

```
backend/
├── models/           # Mongoose schemas
├── controllers/      # Request handlers
├── routes/          # API routes
├── middleware/      # Auth, error handling, rate limiting
├── utils/           # Token utilities
├── app.js           # Express app configuration
└── server.js        # Server entry point
```

## Development

### Environment Setup

Create `.env` file (see `.env.example`)

### Database

Ensure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas
# Update MONGODB_URI in .env
```

### Run Development Server

```bash
npm run dev
```

### Production Build

```bash
npm start
```

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Frontend Integration

### 1. Set up CORS

Update `FRONTEND_URL` in backend `.env` to match your frontend domain.

### 2. Make Requests with Credentials

```javascript
fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // Important: include cookies
  body: JSON.stringify({ email, password }),
});
```

### 3. Handle Token Refresh

If access token expires, automatically call refresh:

```javascript
fetch("http://localhost:5000/api/auth/refresh", {
  method: "POST",
  credentials: "include",
});
```

## Monitoring & Logging

- Signup verification links logged to console
- Password reset links logged to console
- All errors logged with status codes
- Environment info logged on startup

## Best Practices

✓ Never commit `.env` file
✓ Always use HTTPS in production
✓ Implement rate limiting on client side too
✓ Log authentication events for security audit
✓ Regularly rotate JWT secret in production
✓ Monitor rate limiter hits for attack patterns
✓ Use strong, random JWT secret (min 32 chars)

## Troubleshooting

### "Cannot connect to MongoDB"

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify connection string syntax

### "Token is not valid"

- Check if token is expired
- Verify JWT_SECRET matches signing key
- Clear cookies and login again

### "Email already in use"

- User already registered with this email
- Try different email or reset password

## License

Private - DeveloperNoon
