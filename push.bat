@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM FOS-Agri helper: stage, commit, and push the current Git branch.
REM Usage:
REM   push.bat
REM   push.bat "feat: update prestations"

cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git is not installed or not available in PATH.
  pause
  exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo [ERROR] This folder is not a Git repository.
  pause
  exit /b 1
)

for /f "delims=" %%B in ('git branch --show-current 2^>nul') do set "BRANCH=%%B"
if "%BRANCH%"=="" (
  echo [ERROR] Could not detect the current Git branch.
  pause
  exit /b 1
)

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git remote "origin" is not configured.
  pause
  exit /b 1
)

echo.
echo ============================================
echo  FOS-Agri Git Push
echo ============================================
echo Folder : %CD%
echo Branch : %BRANCH%
echo Remote : origin
echo.

echo [INFO] Current changes:
git status --short
echo.

git status --porcelain > "%TEMP%\fosagri-gitstatus.tmp" 2>nul
for %%F in ("%TEMP%\fosagri-gitstatus.tmp") do set "STATUS_SIZE=%%~zF"
del "%TEMP%\fosagri-gitstatus.tmp" >nul 2>nul

if "%STATUS_SIZE%"=="0" (
  echo [INFO] Working tree is clean. No new commit will be created.
  echo [INFO] Pushing existing commits on %BRANCH%...
  git push -u origin "%BRANCH%"
  if errorlevel 1 goto :push_failed
  goto :done
)

set "COMMIT_MSG=%~1"
if "%COMMIT_MSG%"=="" (
  echo Enter commit message, or press Enter for an automatic message:
  set /p "COMMIT_MSG=> "
)

if "%COMMIT_MSG%"=="" (
  for /f "tokens=1-4 delims=/-. " %%a in ("%DATE%") do set "DATE_PART=%%a-%%b-%%c"
  for /f "tokens=1-3 delims=:., " %%a in ("%TIME%") do set "TIME_PART=%%a%%b"
  set "COMMIT_MSG=chore: update site !DATE_PART! !TIME_PART!"
)

echo.
echo [INFO] Staging all changes...
git add -A
if errorlevel 1 (
  echo [ERROR] git add failed.
  pause
  exit /b 1
)

echo [INFO] Creating commit:
echo        "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo [ERROR] git commit failed.
  pause
  exit /b 1
)

echo.
echo [INFO] Pushing %BRANCH% to origin...
git push -u origin "%BRANCH%"
if errorlevel 1 goto :push_failed

:done
echo.
echo [OK] GitHub is updated.
echo.

if exist "%~dp0deploy-vps.bat" (
  set "DEPLOY_CHOICE="
  echo Deploy the same commit to Hostinger VPS now?
  echo Press Enter for YES, or type N to skip.
  set /p "DEPLOY_CHOICE=> "
  if /I not "!DEPLOY_CHOICE!"=="N" (
    echo.
    call "%~dp0deploy-vps.bat" --no-pause
    if errorlevel 1 (
      echo.
      echo [WARN] GitHub push worked, but VPS deploy failed.
      echo        You can retry later by running deploy-vps.bat.
      echo.
      pause
      exit /b 1
    )
  )
)

pause
exit /b 0

:push_failed
echo.
echo [ERROR] Push failed.
echo Common fixes:
echo   1. Check your internet connection.
echo   2. Run: git pull --rebase origin %BRANCH%
echo   3. Resolve conflicts if Git asks, then run push.bat again.
echo.
pause
exit /b 1
