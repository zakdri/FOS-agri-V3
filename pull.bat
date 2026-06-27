@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM FOS-Agri helper: pull the latest changes for the current Git branch.
REM Usage:
REM   pull.bat

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
echo  FOS-Agri Git Pull
echo ============================================
echo Folder : %CD%
echo Branch : %BRANCH%
echo Remote : origin
echo.

echo [INFO] Current changes before pull:
git status --short
echo.

echo [INFO] Fetching latest changes from origin...
git fetch origin
if errorlevel 1 goto :fetch_failed

echo.
echo [INFO] Pulling latest changes into %BRANCH%...
echo [INFO] Local uncommitted changes will be auto-stashed if needed.
git pull --rebase --autostash origin "%BRANCH%"
if errorlevel 1 goto :pull_failed

echo.
echo [INFO] Current changes after pull:
git status --short
echo.

echo [OK] Local branch is updated.
echo.
pause
exit /b 0

:fetch_failed
echo.
echo [ERROR] Fetch failed.
echo Common fixes:
echo   1. Check your internet connection.
echo   2. Confirm you have access to the GitHub repository.
echo   3. Confirm the remote named origin is correct.
echo.
pause
exit /b 1

:pull_failed
echo.
echo [ERROR] Pull failed.
echo Common fixes:
echo   1. Read the Git message above.
echo   2. If there are conflicts, resolve them, then run: git rebase --continue
echo   3. To cancel the pull attempt, run: git rebase --abort
echo.
pause
exit /b 1
