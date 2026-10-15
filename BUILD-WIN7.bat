@echo off
echo Building Desktop Pet for Windows 7 x64...
call npm install
if errorlevel 1 pause & exit /b 1
call npm run build:win7
if errorlevel 1 pause & exit /b 1
echo Finished! Check the dist folder for your EXE.
pause
