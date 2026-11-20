@echo off
cd /d "%~dp0"
echo PULSE+ baslatiliyor: http://localhost:4321
start "" http://localhost:4321
node server.mjs
pause
