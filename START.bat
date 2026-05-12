@echo off
title InventoryPro - Development Server
color 0A

echo.
echo  ========================================
echo   InventoryPro - Enterprise IMS
echo  ========================================
echo.

:: Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Check PostgreSQL
psql --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] PostgreSQL client not found.
    echo Database migrations may not work.
)

echo [OK] System checks passed
echo.

:: Start Frontend
echo Starting Frontend on http://localhost:5173 ...
start "InventoryPro Frontend" cmd /k "cd client && npm run dev"

timeout /t 3 /nobreak >nul

:: Start Backend
echo Starting Backend on http://localhost:3001 ...
start "InventoryPro Backend" cmd /k "cd server && npm run dev"

echo.
echo ========================================
echo  InventoryPro is running!
echo ========================================
echo.
echo  Frontend: http://localhost:5173
echo  Backend:  http://localhost:3001
echo.
echo  Default login:
echo  Email:    admin@inventorypro.com
echo  Password: admin123
echo.
echo  Press any key to exit this window...
pause >nul