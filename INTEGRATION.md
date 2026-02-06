# INTEGRATION GUIDE

This document explains how the frontend and backend are integrated and communicate.

## API Communication Flow

```
Angular Frontend
    ↓
HttpClient with AuthInterceptor
    ↓
Request with JWT Token
    ↓
Backend Server (Express)
    ↓
Auth Middleware (verifies JWT)
    ↓
Controller (business logic)
    ↓
MongoDB (Mongoose)
    ↓
Response back to Frontend
    ↓
RxJS Observable
    ↓
Angular Component
```

---

## Frontend to Backend Integration

### 1. Authentication Flow

**Login Process:**

```
1. User enters email/password in LoginComponent
2. Component calls AuthService.login(email, password)
3. AuthService makes POST to http://localhost:5000/api/auth/login
4. Backend validates credentials against MongoDB
5. Backend returns JWT token
6. AuthService stores token in localStorage
7. User is redirected based on role (Admin → Dashboard, Customer → Quotations)
```

**Token Attachment:**

Every request includes JWT via `AuthInterceptor`:
```typescript
// In auth.interceptor.ts
Authorization: Bearer <token>
```

### 2. Quotation Submission

**Customer Creates Quotation:**

```
1. User fills QuotationFormComponent form
2. Form validates (client-side)
3. Submit calls QuotationService.createQuotation(data)
4. Service POSTs to http://localhost:5000/api/quotations
5. Backend validates again (server-side)
6. Backend saves to MongoDB (Quotation collection)
7. Response returns to component
8. Component redirects to quotation list
```

### 3. Admin Operations

**View All Quotations:**
```
1. AdminQuotationManagementComponent loads
2. Calls QuotationService.getAllQuotations()
3. Service GETs from http://localhost:5000/api/quotations
4. Backend checks authorization (must be Admin)
5. Backend queries all quotations with customer details
6. Returns populated quotations to frontend
7. Component displays in table with edit options
```

**Update Status:**
```
1. Admin selects new status from dropdown
2. Calls QuotationService.updateQuotationStatus(id, status)
3. Service PATCHes to http://localhost:5000/api/quotations/:id/status
4. Backend validates status value
5. Backend updates MongoDB record
6. Returns updated quotation
7. Component updates UI
```

---

## Environment Configuration

### Frontend (`src/environments/environment.ts`)

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api'
};
```

All services use this:
```typescript
constructor(private http: HttpClient) {}

createQuotation(data) {
  const url = `${environment.apiBaseUrl}/quotations`;
  return this.http.post(url, data);
}
```

### Backend (`.env`)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quotation-management
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:4200
```

Backend reads via:
```javascript
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
```

---

## Data Models

### User (Backend → MongoDB)

```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...", // bcrypted
  role: "Customer",
  createdAt: ISODate("2026-02-06"),
  updatedAt: ISODate("2026-02-06")
}
```

### Quotation (Backend → MongoDB)

```javascript
{
  _id: ObjectId,
  customerId: ObjectId("..."), // Reference to User
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  company: "Acme Corp",
  requirementDescription: "We need a website...",
  budget: 5000,
  status: "Pending",
  createdAt: ISODate("2026-02-06"),
  updatedAt: ISODate("2026-02-06")
}
```

### Frontend Interfaces

```typescript
// quotation.service.ts
export interface Quotation {
  _id?: string;
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  requirementDescription: string;
  budget: number;
  status?: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: string;
  updatedAt?: string;
}

// auth.service.ts
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
```

---

## HTTP Status Codes

### Success Responses
- **200 OK** - Request successful
- **201 Created** - Resource created
- **204 No Content** - Successful deletion

### Error Responses
- **400 Bad Request** - Validation error
- **401 Unauthorized** - Missing/invalid token
- **403 Forbidden** - Not authorized for resource
- **404 Not Found** - Resource doesn't exist
- **500 Server Error** - Backend issue

### Example Error Handling (Frontend)

```typescript
this.authService.login(email, password).subscribe({
  next: (response) => {
    // Success - response.token and response.user available
  },
  error: (error) => {
    // error.error.message contains backend error
    const message = error.error?.message || 'Failed';
    this.snackBar.open(message, 'Close');
  }
});
```

---

## CORS Configuration

Backend allows requests from frontend:

```javascript
// server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));
```

This allows:
- Requests from http://localhost:4200
- Credentials (cookies, auth headers)
- All standard HTTP methods

---

## Request/Response Examples

### Register User

**Frontend Request:**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Backend Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Customer"
  }
}
```

### Create Quotation

**Frontend Request:**
```
POST http://localhost:5000/api/quotations
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "company": "Acme Corp",
  "requirementDescription": "We need a website...",
  "budget": 5000
}
```

**Backend Response:**
```json
{
  "message": "Quotation created successfully",
  "quotation": {
    "_id": "507f1f77bcf86cd799439012",
    "customerId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "Acme Corp",
    "requirementDescription": "We need a website...",
    "budget": 5000,
    "status": "Pending",
    "createdAt": "2026-02-06T10:30:00Z",
    "updatedAt": "2026-02-06T10:30:00Z"
  }
}
```

---

## Authentication Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. User registers/logs in
       │
       ▼
┌─────────────────────────────┐
│  Frontend (Angular)         │
│  - LoginComponent           │
│  - AuthService              │
└──────────┬──────────────────┘
           │
           │ 2. POST /api/auth/login
           │
           ▼
┌─────────────────────────────┐
│  Backend (Express)          │
│  - authController.login()   │
│  - Verify password          │
│  - Generate JWT             │
└──────────┬──────────────────┘
           │
           │ 3. Return JWT token
           │
           ▼
┌─────────────────────────────┐
│  Frontend (Angular)         │
│  - Store token in storage   │
│  - Attach to all requests   │
└──────────┬──────────────────┘
           │
           │ 4. Every API request
           │    Authorization: Bearer <JWT>
           │
           ▼
┌─────────────────────────────┐
│  Backend (Express)          │
│  - auth middleware          │
│  - Verify JWT               │
│  - Attach user to request   │
│  - Execute controller       │
└─────────────────────────────┘
```

---

## Validation Strategy

### Frontend Validation
- Real-time form validation (Reactive Forms)
- Type checking with TypeScript
- User feedback via Material snackbars

### Backend Validation
- Input validation in middleware
- Database schema validation (Mongoose)
- Custom business logic validation
- All client validations re-checked

### Example (Quotation Creation)

**Frontend:**
```typescript
this.form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  budget: ['', [Validators.required, Validators.min(1)]]
});
```

**Backend:**
```javascript
// middleware/validation.js
const validation = validateQuotationRequest(data);
if (!validation.isValid) {
  return res.status(400).json({ errors: validation.errors });
}
```

---

## Security Features

### Frontend
- ✅ JWT stored in localStorage
- ✅ Auth token sent in Authorization header
- ✅ Route guards prevent unauthorized access
- ✅ Form validation
- ✅ HTTPS in production

### Backend
- ✅ JWT verification on protected routes
- ✅ Password hashing with bcryptjs
- ✅ Role-based authorization
- ✅ Input validation and sanitization
- ✅ Helmet for security headers
- ✅ CORS configuration

---

## Debugging Tips

### Frontend (DevTools)

**Check Network Requests:**
1. Open DevTools (F12)
2. Go to Network tab
3. Perform action (login, submit quotation)
4. Click request to see details:
   - URL, method, headers
   - Request body
   - Response body
   - Status code

**Check Storage:**
```javascript
// In console
localStorage.getItem('token')
// Should return JWT token
```

**Check Console Errors:**
- Look for CORS errors
- Authorization errors
- Network failures

### Backend (Terminal/Logs)

Morgan middleware logs all requests:
```
POST /api/auth/login 200 15ms
POST /api/quotations 201 45ms
GET /api/quotations 200 25ms
```

### MongoDB (mongosh)

```bash
mongosh
use quotation-management

# Check users
db.users.find().pretty()

# Check quotations
db.quotations.find().pretty()

# Check specific quotation
db.quotations.findOne({ _id: ObjectId("...") })
```

---

## Testing the Integration

### 1. Test Registration
```
Frontend: http://localhost:4200/register
Backend: Listens to POST /api/auth/register
Database: Checks email doesn't exist, saves user
Result: Token returned, user logged in
```

### 2. Test Quotation Creation
```
Frontend: http://localhost:4200/quotations/create
Backend: Listens to POST /api/quotations with auth
Database: Saves quotation with customerId
Result: Quotation visible in list
```

### 3. Test Admin Dashboard
```
Frontend: http://localhost:4200/admin/dashboard
Backend: Listens to GET /api/dashboard/stats with admin check
Database: Counts quotations by status
Result: Statistics displayed
```

---

## Production Deployment

### Environment Changes

**Frontend (.env.production):**
```
apiBaseUrl=https://api.yourdomain.com/api
```

**Backend (.env):**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/quotation-management
JWT_SECRET=generate-strong-random-secret
FRONTEND_URL=https://yourdomain.com
```

### Build Commands

```bash
# Frontend
cd frontend
npm run build
# Deploy contents of dist/ to web server

# Backend
cd backend
npm install
NODE_ENV=production node server.js
# Run on server with process manager (PM2)
```

---

This integration ensures smooth communication between frontend and backend with proper error handling, validation, and security throughout the entire flow.
