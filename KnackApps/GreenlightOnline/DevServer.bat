@echo off
echo Starting Greenlight Local Development Servers...
echo.

:: Start FileServer in a new window
start "FileServer (Port 3000)" cmd /k "node C:\Code\Lib\KTL\NodeJS\NodeJS_FileServer.js"

:: Wait a moment for first server to start
timeout /t 2 /nobreak >nul

:: Start API server in a new window
start "API Server (Port 3001)" cmd /k "cd /d C:\Code\KnackApps\GreenlightOnline && npm run dev"

echo.
echo Both servers starting in separate windows.
echo - FileServer (JS/CSS): http://localhost:3000
echo - API Server: http://localhost:3001
echo.
echo Close both windows to stop servers.
