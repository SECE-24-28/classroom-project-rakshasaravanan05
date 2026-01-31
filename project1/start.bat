@echo off
echo Starting Campus Issue Reporting System...
echo.

echo Step 1: Starting MongoDB (make sure MongoDB is installed and running)
echo.

echo Step 2: Starting Server...
start "Server" cmd /k "cd server && npm run dev"

echo Waiting 5 seconds for server to start...
timeout /t 5 /nobreak > nul

echo Step 3: Starting Client...
start "Client" cmd /k "cd client && npm start"

echo.
echo ✅ Both server and client are starting!
echo.
echo 🌐 Open your browser and go to: http://localhost:3000
echo.
echo 👥 Demo Accounts:
echo    Admin: admin@campus.edu / admin123
echo    Student: student@campus.edu / student123
echo.
echo Press any key to exit...
pause > nul