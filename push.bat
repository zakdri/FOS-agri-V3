@echo off
setlocal

REM ── Safety guard: must be on main branch ──────────────────────────────────
for /f "delims=" %%B in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set BRANCH=%%B
if /i not "%BRANCH%"=="main" (
  echo [ERROR] You are on branch "%BRANCH%", not "main". Aborting.
  pause
  exit /b 1
)

REM ── Check for anything to commit ──────────────────────────────────────────
git status --porcelain > "%TEMP%\gitstatus.tmp" 2>&1
for %%F in ("%TEMP%\gitstatus.tmp") do set SIZE=%%~zF
if "%SIZE%"=="0" (
  echo [INFO] Nothing to commit - working tree is clean.
  pause
  exit /b 0
)
del "%TEMP%\gitstatus.tmp"

REM ── Stage, commit with timestamp, push ────────────────────────────────────
echo [INFO] Staging all changes...
git add .

REM Build a timestamp for the commit message
for /f "tokens=1-3 delims=/- " %%a in ('date /t') do set DATESTR=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIMESTR=%%a%%b

git commit -m "deploy: update %DATESTR% %TIMESTR%"
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Commit failed. Check git output above.
  pause
  exit /b 1
)

git push origin main
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Push failed. Check git output above.
  pause
  exit /b 1
)

echo.
echo [OK] Successfully pushed to main.
pause
endlocal
