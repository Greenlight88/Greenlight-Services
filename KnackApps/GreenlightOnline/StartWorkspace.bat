@echo off
echo Starting Greenlight Development Workspace...
echo.

:: Kill any existing servers on ports 3000 and 3001
echo Checking for existing servers...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing existing process on port 3000 (PID: %%a)
    taskkill /F /PID %%a >NUL 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    echo Killing existing process on port 3001 (PID: %%a)
    taskkill /F /PID %%a >NUL 2>&1
)
timeout /t 1 /nobreak >NUL

:: Start FileServer minimized (won't steal focus)
echo Starting FileServer (Port 3000)...
start /min "FileServer (Port 3000)" cmd /k "node C:\Code\Lib\KTL\NodeJS\NodeJS_FileServer.js"

:: Wait a moment for first server to start
timeout /t 2 /nobreak >NUL

:: Start API server minimized (won't steal focus)
echo Starting API Server (Port 3001)...
start /min "API Server (Port 3001)" cmd /k "cd /d C:\Code\KnackApps\GreenlightOnline && npm run dev"

:: Wait a moment then open browser tabs
timeout /t 1 /nobreak >NUL

:: Open browser tabs in background (won't steal focus)
echo Opening browser tabs...
powershell -Command "Start-Process 'https://app.greenlightservices.com.au/greenlight-online?dev=1#welcome-page' -WindowStyle Hidden"
powershell -Command "Start-Process 'https://builder.knack.com/greenlightservices/greenlight-online/' -WindowStyle Hidden"

echo.
echo Workspace starting:
echo   - FileServer (JS/CSS): http://localhost:3000
echo   - API Server: http://localhost:3001
echo   - Knack App: https://app.greenlightservices.com.au/greenlight-online?dev=1
echo   - Knack Builder: https://builder.knack.com/greenlightservices/greenlight-online/
echo.
echo Launching Claude Code...
echo.

:: Launch Claude Code in this folder
cd /d C:\Code\KnackApps\GreenlightOnline
claude
