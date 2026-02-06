# Quotation Management System

A complete, production-ready quotation management system built with Angular 17 frontend and Node.js/Express backend with MongoDB database.

## Features

### Customer Features
- User registration and login
- Submit quotation requests
- View their quotations
- Track quotation status (Pending/Approved/Rejected)

### Admin Features
- Secure admin login
- View all quotations
- Update quotation status
- Delete quotations
- Dashboard with statistics:
  - Total quotations
  - Pending count
  - Approved count
  - Rejected count

### Security Features
- JWT authentication
- bcryptjs password hashing
- Role-based access control (Admin, Customer)
- Protected routes with guards
- Helmet for HTTP headers
- CORS enabled

## Technology Stack

### Frontend
- Angular 17
- Angular Material UI
- Reactive Forms
- TypeScript 5.2
- RxJS 7.8

### Backend
- Node.js
- Express.js 4.18
- MongoDB with Mongoose 8.0
- JWT (jsonwebtoken)
- bcryptjs
- Helmet
- CORS
- Morgan

### Development Tools
- nodemon (auto-restart)
- dotenv (environment variables)

## Project Structure

```
quotation-management-system/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/       # Auth, validation, error handling
│   ├── config/          # Database config
│   ├── utils/           # Helpers (JWT, async handler)
│   ├── server.js        # Main server file
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── auth/           # Login/Register
    │   │   ├── quotations/     # Customer features
    │   │   ├── admin/          # Admin dashboard
    │   │   ├── core/           # Services, guards, interceptors
    │   │   └── shared/         # Common components
    │   ├── environments/        # API config
    │   └── main.ts            # Entry point
    └── package.json
```

## Installation

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community))
- npm 9+ or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file from example:**
```bash
cp .env.example .env
```

4. **Edit .env file** (optional, defaults work for local development):
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/quotation-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:4200
```

5. **Start MongoDB** (if not running as a service):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or manually
mongod
```

6. **Start backend server:**
```bash
npm run dev
```

Server will run at: **http://localhost:5000**

### Frontend Setup

1. **Navigate to frontend directory (in new terminal):**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm start
```

Application will open at: **http://localhost:4200**

## Usage

### First Time Setup

1. **Register a new account:**
   - Click "Register" button
   - Fill in name, email, password
   - You'll be logged in as a Customer

2. **Submit a quotation:**
   - Click "New Quotation" button
   - Fill in all required fields
   - Click "Submit Quotation"

3. **View quotations:**
   - Navigate to "Quotations"
   - See all your submitted quotations
   - Click eye icon to view details

### Admin Access

4. **Create admin account** (direct database or API):
   - Register normally first
   - Update user role to "Admin" in MongoDB:
   ```bash
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "Admin" } }
   )
   ```

5. **Login as admin:**
   - After login, you'll see "Dashboard" in menu
   - Access dashboard to view statistics
   - Manage quotations: view, update status, delete

## API Endpoints

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user
```

### Quotations (Customer)
```
POST   /api/quotations        - Create quotation
GET    /api/quotations/my-quotations  - Get my quotations
GET    /api/quotations/:id    - Get single quotation
```

### Quotations (Admin)
```
GET    /api/quotations        - Get all quotations
PATCH  /api/quotations/:id/status - Update status
DELETE /api/quotations/:id    - Delete quotation
```

### Dashboard (Admin)
```
GET    /api/dashboard/stats   - Get dashboard statistics
```

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Customer|Admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Quotation
```javascript
{
  _id: ObjectId,
  customerId: ObjectId (reference to User),
  name: String,
  email: String,
  phone: String,
  company: String,
  requirementDescription: String,
  budget: Number,
  status: String (Pending|Approved|Rejected),
  createdAt: Date,
  updatedAt: Date
}
```

## Build for Production

### Frontend
```bash
cd frontend
npm run build
# Output in dist/quotation-management-frontend
```

### Backend
```bash
cd backend
NODE_ENV=production node server.js
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check MONGODB_URI in .env matches your setup
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: `ng serve --port 4300`

### CORS Error
- Check FRONTEND_URL in backend .env
- Ensure it matches your frontend URL

### Login Issues
- Verify token is stored in localStorage
- Check browser console for error details
- Clear localStorage: `localStorage.clear()`

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Angular cache: `rm -rf .angular && ng build`

## Security Checklist

- [ ] Change JWT_SECRET in .env to a strong random string
- [ ] Use environment-specific configuration
- [ ] Enable HTTPS in production
- [ ] Set secure CORS origins
- [ ] Use strong database passwords
- [ ] Enable MongoDB authentication
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Use environment variables for sensitive data
- [ ] Implement rate limiting (add express-rate-limit)

## Performance Tips

1. **Enable compression:** Add in server.js
```javascript
import compression from 'compression';
app.use(compression());
```

2. **Add caching headers:** Helmet does this by default

3. **Database indexing:** Already added on Quotation model

4. **Frontend lazy loading:** Already configured in routes

## Development Commands

### Backend
```bash
npm run dev    # Run with nodemon (auto-restart)
npm run start  # Run normally
```

### Frontend
```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run unit tests
```

## License

MIT

## Support

For issues or questions, please review the code comments and error messages in the console. The project is built with best practices and is ready for production use.

---

**Created:** 2026
**Version:** 1.0.0
