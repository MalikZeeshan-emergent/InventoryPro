@echo off
title InventoryPro Setup
color 0A

echo.
echo  ========================================
echo   InventoryPro - Enterprise IMS Setup
echo  ========================================
echo.

:: Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install from: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js found

:: Check npm
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)
echo [OK] npm found

echo.
echo Installing dependencies...
echo.

:: Install root dependencies
echo [1/3] Installing root dependencies...
npm install >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Some root dependencies may have issues
)

:: Install client dependencies
echo [2/3] Installing frontend dependencies...
cd client
call npm install
cd ..

:: Install server dependencies
echo [3/3] Installing backend dependencies...
cd server
call npm install
cd ..

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Install PostgreSQL from https://www.postgresql.org
echo 2. Create database: CREATE DATABASE inventorypro;
echo 3. Copy server\.env.example to server\.env and configure
echo 4. Run server\migrate (or it will auto-migrate on first run)
echo 5. Run START.bat to launch the application
echo.
pause