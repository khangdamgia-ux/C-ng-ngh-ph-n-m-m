@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================================
echo   HOI AN AUDIO GUIDE - CHAY TAT CA (1 lan bam la xong)
echo   1) Tai anh dia diem con thieu   2) Build + khoi dong he thong
echo ============================================================
echo.
docker info >nul 2>&1
if errorlevel 1 (
  echo [!] Docker Desktop chua chay. Dang thu mo Docker Desktop...
  start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
  echo     Cho Docker khoi dong, toi da 3 phut...
  for /l %%i in (1,1,36) do (
    timeout /t 5 /nobreak >nul
    docker info >nul 2>&1 && goto docker_ok
  )
  echo [LOI] Docker van chua san sang. Mo Docker Desktop bang tay, cho bao "running" roi chay lai file nay.
  pause
  exit /b 1
)
:docker_ok
echo [1/2] Tai anh dia diem...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tai-anh-dia-diem.ps1"
echo.
echo [2/2] Build va khoi dong he thong (lan dau co the mat vai phut)...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start.ps1"
pause
