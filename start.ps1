# Khoi dong toan bo Hoi An Audio Guide + tunnel HTTPS + ma QR.
# May moi: tu khoi phuc du lieu tu backup\ neu chua co du lieu.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$P = 'hoian-audio-guide'                       # co dinh ten project => ten volume luon giong nhau o moi may
$dc = @('compose', '-p', $P)
$rootFwd = $root -replace '\\', '/'

function Step($m) { Write-Host "`n==> $m" -ForegroundColor Cyan }
function Fail($m) { Write-Host "`nLOI: $m" -ForegroundColor Red; Read-Host 'Nhan Enter de dong'; exit 1 }

Step 'Kiem tra Docker'
docker info *> $null
if ($LASTEXITCODE -ne 0) { Fail 'Docker Desktop chua chay. Hay mo Docker Desktop, cho bao running roi chay lai.' }

Step 'Kiem tra file .env'
if (-not (Test-Path .env)) {
  if (Test-Path .env.example) { Copy-Item .env.example .env; Write-Host 'Da tao .env tu .env.example. Hay sua mat khau roi chay lai.' -ForegroundColor Yellow; notepad .env; Fail 'Sua xong .env thi chay lai start.bat.' }
  Fail 'Thieu file .env (hay chep .env tu may cu vao thu muc nay).'
}

Step 'Kiem tra du lieu'
docker volume inspect "${P}_mssql-data" *> $null
$firstRun = ($LASTEXITCODE -ne 0)
$restored = $false
if ($firstRun) {
  Write-Host 'May nay chua co du lieu.'
  if (Test-Path backup\mssql-data.tgz) {
    Step 'Khoi phuc du lieu tu backup\'
    docker @dc create --build
    if ($LASTEXITCODE -ne 0) { Fail 'docker compose create loi.' }
    docker run --rm -v "${P}_mssql-data:/v" -v "${rootFwd}/backup:/b" alpine tar xzf /b/mssql-data.tgz -C /v
    if ($LASTEXITCODE -ne 0) { Fail 'Khoi phuc database loi.' }
    if (Test-Path backup\media.tgz) {
      docker run --rm -v "${P}_media:/v" -v "${rootFwd}/backup:/b" alpine tar xzf /b/media.tgz -C /v
    }
    $restored = $true
  } else {
    Write-Host 'Khong co backup\mssql-data.tgz: se tao du lieu mau moi.' -ForegroundColor Yellow
  }
} else {
  Write-Host 'Da co du lieu, giu nguyen.'
}

Step 'Bat he thong (lan dau build co the mat vai phut)'
docker @dc up -d --build --wait
if ($LASTEXITCODE -ne 0) { Fail 'Khong bat duoc he thong. Xem: docker compose -p hoian-audio-guide logs --tail 50' }
if ($firstRun -and -not $restored) {
  Step 'Tao bang + du lieu mau'
  docker @dc --profile tools run --rm migrate
}

Step 'Mo tunnel HTTPS (cloudflared)'
$cf = (Get-Command cloudflared -ErrorAction SilentlyContinue).Source
if (-not $cf) { $cf = 'C:\Program Files (x86)\cloudflared\cloudflared.exe' }
if (-not (Test-Path $cf)) { Fail 'Khong tim thay cloudflared. Cai: winget install Cloudflare.cloudflared (roi mo lai PowerShell).' }
$log = Join-Path $env:TEMP 'cloudflared-hoian.log'
Remove-Item $log, "$log.out" -ErrorAction SilentlyContinue
$tun = Start-Process $cf -ArgumentList 'tunnel', '--url', 'http://localhost:80' -PassThru -WindowStyle Hidden -RedirectStandardError $log -RedirectStandardOutput "$log.out"

try {
  $url = $null
  for ($i = 0; $i -lt 60 -and -not $url; $i++) {
    Start-Sleep 1
    if (Test-Path $log) {
      $m = Select-String -Path $log -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' | Select-Object -First 1
      if ($m) { $url = $m.Matches[0].Value }
    }
  }
  if (-not $url) { Fail "Khong lay duoc link tunnel. Xem log: $log" }

  Step 'Tao ma QR'
  if (-not (Test-Path node_modules\qrcode\index.js)) { npm install --no-save --no-audit --no-fund qrcode }
  node scripts/share-qr.mjs --url $url
  if (Test-Path qr-trang-chu.png) { Start-Process (Resolve-Path qr-trang-chu.png) }

  Write-Host "`nDANG CHAY. Link: $url" -ForegroundColor Green
  Write-Host "Admin: $url/admin"
  Write-Host 'Giu cua so nay mo. Nhan Ctrl+C hoac dong cua so de dung tunnel.' -ForegroundColor Yellow
  Wait-Process -Id $tun.Id
} finally {
  if ($tun -and -not $tun.HasExited) { Stop-Process -Id $tun.Id -Force }
}