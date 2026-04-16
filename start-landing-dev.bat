@echo off
REM Start the landing page in dev mode
cd /d "%~dp0"
call pnpm land:dev
