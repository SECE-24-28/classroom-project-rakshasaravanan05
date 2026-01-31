# Campus Issue Reporting System - Complete Setup Guide

## 🚀 Quick Start (Run these commands in order)

### 1. Install Dependencies
```bash
# Install main project dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### 2. Setup Database & Admin
```bash
# Create admin user
npm run create-admin

# Add sample data with mixed statuses
npm run add-mixed-status
```

### 3. Start the Application
```bash
# Start both server and client (run in project root)
npm run dev
```

## 🔧 Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Solution:**
- Make sure MongoDB is running
- Check if server starts on port 5000
- Verify .env file exists in server folder

### Issue 2: "CORS errors"
**Solution:**
- Server must run on port 5000
- Client must run on port 3000
- Check server CORS configuration

### Issue 3: "Authentication not working"
**Solution:**
- Clear browser cookies
- Check session configuration
- Verify user exists in database

### Issue 4: "Images not uploading"
**Solution:**
- Check uploads folder exists
- Verify multer configuration
- Check file size limits

## 📱 Test Accounts

**Admin Account:**
- Email: admin@campus.edu
- Password: admin123

**Student Account:**
- Email: student@campus.edu
- Password: student123

## 🌐 URLs to Test

- Home: http://localhost:3000
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
- Dashboard: http://localhost:3000/dashboard
- Report Issue: http://localhost:3000/report-issue
- My Issues: http://localhost:3000/my-issues
- Admin Panel: http://localhost:3000/admin

## 🔍 Debugging Steps

1. **Check Server Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Check Database Connection:**
   - Verify MongoDB is running
   - Check connection string in .env

3. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

4. **Check Server Logs:**
   - Look at terminal running server
   - Check for error messages

## 📋 Project Structure Verification

```
project1/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, IssueCard, etc.
│   │   ├── pages/          # Home, Login, Dashboard, etc.
│   │   ├── context/        # AuthContext
│   │   └── utils/          # API utilities
├── server/                 # Node.js backend
│   ├── controllers/        # Auth & Issue controllers
│   ├── models/             # User & Issue models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication middleware
│   ├── uploads/            # Image storage
│   └── .env               # Environment variables
└── package.json           # Main project config
```

## ⚡ Quick Fix Commands

```bash
# Reset everything and start fresh
npm run clear-issues
npm run create-admin
npm run add-mixed-status

# Restart services
npm run dev
```

## 🆘 If Still Not Working

1. Delete node_modules in both client and server
2. Run npm install in both folders
3. Check MongoDB is running
4. Verify all files exist as per structure above
5. Check browser console for specific errors