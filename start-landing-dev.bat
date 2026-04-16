@echo off
REM Start the landing page in dev mode (bypasses turbo to avoid Windows DLL issue)
cd /d "%~dp0apps\landing-page"
call pnpm dev
