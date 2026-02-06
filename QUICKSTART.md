# QUICK START GUIDE

This guide will get you up and running in minutes.

## Prerequisites Check
- ✅ Node.js 18+ installed? `node --version`
- ✅ MongoDB installed? Check MongoDB documentation for your OS
- ✅ npm installed? `npm --version`

---

## STEP 1: Start MongoDB (5 seconds)

### macOS (Homebrew)
```bash
brew services start mongodb-community
```

### macOS (Manual)
```bash
mongod
```

### Windows
MongoDB should run automatically if installed via installer. If not:
```bash
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

### Linux
```bash
sudo systemctl start mongod
```

---

## STEP 2: Backend Setup (2 minutes)

Open Terminal 1:

```bash
# Navigate to backend
cd backend

# Install dependencies (takes ~1 minute)
npm install

# Start backend server
npm run dev
```

**Expected output:**
```
Server running on http://localhost:5000
MongoDB connected successfully
```

---

## STEP 3: Frontend Setup (2 minutes)

Open Terminal 2:

```bash
# Navigate to frontend
cd frontend

# Install dependencies (takes ~1 minute)
npm install

# Start frontend server
npm start
```

**Expected output:**
```
Application bundle generation complete.
✔ Compiled successfully.
```

Browser will open: **http://localhost:4200**

---

## STEP 4: Test the Application (2 minutes)

### Test Customer Flow
1. Click **Register**
2. Fill in details:
   - Name: John Doe
   - Email: john@example.com
   - Password: Password123
   - Confirm: Password123
3. Click **Register**
4. You're now logged in! Click **New Quotation**
5. Fill in quotation details and submit
6. View quotation in the list

### Test Admin Flow
1. Go back and click **Logout**
2. Click **Register** again with different email:
   - Email: admin@example.com
   - Password: Admin123
3. Open MongoDB (in new terminal):
   ```bash
   mongosh
   ```
4. Execute:
   ```javascript
   use quotation-management
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "Admin" } }
   )
   ```
5. Close mongosh: `exit`
6. Go back to app, logout and login with admin account
7. You'll see **Dashboard** in the menu
8. Click Dashboard to see statistics

---

## COMPLETE URLS

| What | URL |
|------|-----|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:5000/api |
| Backend Health | http://localhost:5000/api/health |
| MongoDB | mongodb://localhost:27017 |

---

## TROUBLESHOOTING

### Error: "MongoDB connection failed"
```bash
# Check if MongoDB is running
brew services list | grep mongo

# If not running, start it
brew services start mongodb-community
```

### Error: "Port 5000 already in use"
Edit `backend/.env`:
```
PORT=5001
```

### Error: "Port 4200 already in use"
```bash
ng serve --port 4300
```

### Error: npm install takes too long
Kill it (Ctrl+C) and retry:
```bash
npm install --legacy-peer-deps
```

### Blank page on frontend
1. Open DevTools (F12)
2. Check Console for errors
3. Check if backend is running: http://localhost:5000/api/health
4. Clear localStorage: `localStorage.clear()`
5. Refresh page

### Can't login
1. Check email/password spelling
2. Verify user exists in MongoDB:
   ```bash
   mongosh
   use quotation-management
   db.users.findOne({ email: "your@email.com" })
   ```

---

## WHAT'S WORKING

✅ User registration
✅ User login with JWT
✅ Customer quotation submission
✅ View quotations
✅ Admin dashboard
✅ Admin quotation management
✅ Status updates
✅ Password hashing
✅ Role-based access
✅ Form validation
✅ Error handling
✅ Responsive UI
✅ Material Design

---

## NEXT STEPS

1. Explore the dashboard
2. Create multiple quotations
3. Test admin status updates
4. Review code in `/backend` and `/frontend`
5. Check API responses in DevTools Network tab

---

## KEEPING IT RUNNING

**Terminal 1 (Backend):** Keep running
```bash
npm run dev
```

**Terminal 2 (Frontend):** Keep running
```bash
npm start
```

**Terminal 3 (Optional - MongoDB):** If using manual mongod
```bash
mongod
```

---

## STOP EVERYTHING

```bash
# Terminal 1
Ctrl+C

# Terminal 2
Ctrl+C

# Terminal 3
Ctrl+C

# Stop MongoDB
brew services stop mongodb-community
```

---

## FILES THAT MATTER

For debugging, check these files:

**Backend:**
- `backend/server.js` - Main entry
- `backend/.env` - Configuration
- `backend/controllers/*` - Business logic
- `backend/models/*` - Database schema

**Frontend:**
- `frontend/src/main.ts` - Entry point
- `frontend/src/app/app.routes.ts` - Routes
- `frontend/src/app/core/services/*` - API calls

---

**Everything ready? Go to http://localhost:4200 and start using it!**
