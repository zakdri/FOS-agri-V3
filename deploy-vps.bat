@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM FOS-Agri helper: deploy the current committed Git version to Hostinger VPS.
REM Usage:
REM   deploy-vps.bat
REM
REM Notes:
REM   - This deploys HEAD, not uncommitted local edits.
REM   - Run push.bat first when you have changes.
REM   - Requires SSH config alias: vps1451411

cd /d "%~dp0"

set "NO_PAUSE="
if /I "%~1"=="--no-pause" set "NO_PAUSE=1"

set "VPS_HOST=vps1451411"
set "VPS_APP=/var/www/apps/fos-agri-temp"
set "LIVE_URL=http://srv1451411.hstgr.cloud"

where git >nul 2>nul
if errorlevel 1 goto :missing_git

where ssh >nul 2>nul
if errorlevel 1 goto :missing_ssh

where scp >nul 2>nul
if errorlevel 1 goto :missing_scp

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 goto :not_repo

git status --porcelain > "%TEMP%\fosagri-deploy-status.tmp" 2>nul
for %%F in ("%TEMP%\fosagri-deploy-status.tmp") do set "STATUS_SIZE=%%~zF"
del "%TEMP%\fosagri-deploy-status.tmp" >nul 2>nul

if not "%STATUS_SIZE%"=="0" (
  echo.
  echo [ERROR] Your working tree has uncommitted changes.
  echo         Run push.bat first so the website deploy includes your latest edits.
  echo.
  git status --short
  goto :fail
)

for /f "delims=" %%C in ('git rev-parse --short HEAD 2^>nul') do set "COMMIT=%%C"
if "%COMMIT%"=="" goto :missing_commit

for /f "delims=" %%T in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set "STAMP=%%T"
set "RELEASE=%STAMP%-%COMMIT%"
set "ARCHIVE=%TEMP%\fos-agri-%RELEASE%.tar"

echo.
echo ============================================
echo  FOS-Agri VPS Deploy
echo ============================================
echo Folder  : %CD%
echo Commit  : %COMMIT%
echo Release : %RELEASE%
echo Host    : %VPS_HOST%
echo URL     : %LIVE_URL%
echo.

if exist "%ARCHIVE%" del "%ARCHIVE%" >nul 2>nul

echo [INFO] Creating deployment archive from Git HEAD...
git archive --format=tar -o "%ARCHIVE%" HEAD
if errorlevel 1 goto :archive_failed

echo [INFO] Uploading archive to VPS...
scp "%ARCHIVE%" "%VPS_HOST%:/tmp/fos-agri-%RELEASE%.tar"
if errorlevel 1 goto :upload_failed

echo [INFO] Creating release and switching live website...
ssh "%VPS_HOST%" "set -e; release='%RELEASE%'; app='%VPS_APP%'; rm -rf $app/releases/$release; mkdir -p $app/releases/$release; tar -xf /tmp/fos-agri-$release.tar -C $app/releases/$release; chown -R www-data:www-data $app/releases/$release; ln -sfn $app/releases/$release $app/current; rm -f /tmp/fos-agri-$release.tar; nginx -t; systemctl reload nginx; readlink -f $app/current"
if errorlevel 1 goto :remote_failed

del "%ARCHIVE%" >nul 2>nul

echo.
echo [OK] VPS website is updated.
echo [OK] Opening live website with cache-busting query...
echo.
echo %LIVE_URL%/?deploy=%RELEASE%
start "" "%LIVE_URL%/?deploy=%RELEASE%"
goto :success

:missing_git
echo [ERROR] Git is not installed or not available in PATH.
goto :fail

:missing_ssh
echo [ERROR] SSH is not installed or not available in PATH.
goto :fail

:missing_scp
echo [ERROR] SCP is not installed or not available in PATH.
goto :fail

:not_repo
echo [ERROR] This folder is not a Git repository.
goto :fail

:missing_commit
echo [ERROR] Could not detect the current Git commit.
goto :fail

:archive_failed
echo [ERROR] Could not create the deployment archive.
goto :fail_cleanup

:upload_failed
echo [ERROR] Could not upload the archive to the VPS.
goto :fail_cleanup

:remote_failed
echo [ERROR] VPS deployment failed while extracting or switching the release.
goto :fail_cleanup

:fail_cleanup
if exist "%ARCHIVE%" del "%ARCHIVE%" >nul 2>nul
goto :fail

:success
if not defined NO_PAUSE pause
exit /b 0

:fail
echo.
echo [HELP] Make sure your SSH alias vps1451411 works:
echo        ssh vps1451411
echo.
if not defined NO_PAUSE pause
exit /b 1
