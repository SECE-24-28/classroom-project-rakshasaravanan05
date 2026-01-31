@echo off
echo Fixing port conflicts...

echo Killing processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000"') do taskkill /f /pid %%a 2>nul

echo Killing processes on port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000"') do taskkill /f /pid %%a 2>nul

echo Ports cleared!
echo.
echo Starting fresh servers...

echo Starting server...
start "Server" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting client...
start "Client" cmd /k "cd client && npm start"

echo.
echo ✅ Application starting fresh!
echo 🌐 Open: http://localhost:3000
echo 👤 Login: admin@campus.edu / admin123
echo.
pause