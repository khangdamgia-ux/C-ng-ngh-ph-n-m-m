# Sao luu du lieu vao thu muc backup\ (chay truoc khi chep code sang may khac).
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$P = 'hoian-audio-guide'
$rootFwd = $root -replace '\\', '/'
New-Item -ItemType Directory -Force backup | Out-Null
docker compose -p $P stop sqlserver
docker run --rm -v "${P}_mssql-data:/v" -v "${rootFwd}/backup:/b" alpine tar czf /b/mssql-data.tgz -C /v .
docker run --rm -v "${P}_media:/v" -v "${rootFwd}/backup:/b" alpine tar czf /b/media.tgz -C /v .
docker compose -p $P start sqlserver
Get-ChildItem backup | Select-Object Name, @{n='MB';e={[math]::Round($_.Length/1MB,2)}}