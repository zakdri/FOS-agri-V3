@echo off
setlocal

REM ── Safety guard: must be on main branch ──────────────────────────────────
for /f "delims=" %%B in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set BRANCH=%%B
if /i not "%BRANCH%"=="main" (
  echo [ERROR] You are on branch "%BRANCH%", not "main". Aborting.
  pause
  exit /b 1
)

REM ── Commit only if there are uncommitted changes ───────────────────────────
git status --porcelain > "%TEMP%\gitstatus.tmp" 2>&1
for %%F in ("%TEMP%\gitstatus.tmp") do set SIZE=%%~zF
del "%TEMP%\gitstatus.tmp"

if not "%SIZE%"=="0" (
  echo [INFO] Staging all changes...
  git add .

  for /f "tokens=2-4 delims=/ " %%a in ('date /t') do set DATESTR=%%c-%%a-%%b
  for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIMESTR=%%a%%b

  git commit -m "deploy: update %DATESTR% %TIMESTR%"
  if %ERRORLEVEL% neq 0 (
    echo [ERROR] Commit failed. Check git output above.
    pause
    exit /b 1
  )
) else (
  echo [INFO] Working tree is clean - skipping commit.
)

REM ── Always push (covers clean tree with unpushed commits) ─────────────────
echo [INFO] Pushing to origin/main...
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
