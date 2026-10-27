@echo off
cd /d "%~dp0"
echo === Nap du 6 ngon ngu (vi, en, fr, ko, zh, ja) vao database ===
echo Chi them cai con thieu, khong ghi de noi dung ban da sua trong admin.
docker info >nul 2>&1
if errorlevel 1 (echo LOI: Docker Desktop chua chay. Hay mo Docker Desktop roi chay lai. & pause & exit /b 1)
docker compose -p hoian-audio-guide up -d sqlserver
docker compose -p hoian-audio-guide --profile tools build migrate
if errorlevel 1 (echo LOI: build that bai. & pause & exit /b 1)
docker compose -p hoian-audio-guide --profile tools run --rm migrate node scripts/nap-ngon-ngu.mjs
if errorlevel 1 (echo LOI: khong nap duoc. Gui nguyen thong bao tren cho nguoi ho tro. & pause & exit /b 1)
echo.
echo XONG. Mo lai trang web, bam Ctrl+F5 de thay ngon ngu moi.
pause
