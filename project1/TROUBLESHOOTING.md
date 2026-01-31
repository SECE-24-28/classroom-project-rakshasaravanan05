# Troubleshooting Registration Issues

## Common Errors and Solutions:

### 1. "Cannot connect to server"
**Solution:**
- Make sure the server is running: `cd server && npm run dev`
- Check if server is running on port 5000: http://localhost:5000/api/health

### 2. "User already exists"
**Solution:**
- Try with a different email address
- Or clear the database and start fresh

### 3. "Server error"
**Solution:**
- Make sure MongoDB is running
- Check server console for detailed error messages

### 4. CORS errors
**Solution:**
- Server should be running on port 5000
- Client should be running on port 3000

## Quick Test Steps:

1. **Test Server Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Test Registration API directly:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"name":"Test User","email":"test@test.com","password":"test123"}'
   ```

3. **Check MongoDB Connection:**
   - Make sure MongoDB is running
   - Check connection string in .env file

## Start Both Services:
```bash
# Terminal 1 - Start Server
cd server
npm run dev

# Terminal 2 - Start Client  
cd client
npm start
```

## Check Browser Console:
- Open browser developer tools
- Check Console tab for error messages
- Check Network tab for failed requests