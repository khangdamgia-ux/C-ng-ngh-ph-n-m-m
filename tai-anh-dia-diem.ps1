# Tai anh that (giay phep tu do, Wikimedia Commons) cho cac dia diem con dang dung anh minh hoa.
# Anh luu vao apps\web\public\places\<ma-dia-diem>.jpg - web tu dong uu tien .jpg truoc .svg.
# Chi tai anh con thieu, khong ghi de anh da co. Nguon & tac gia: apps\web\public\places\NGUON-ANH.md
#  - Phan 1: anh da chon san (biet chinh xac file tren Commons).
#  - Phan 2: tu TIM KIEM tren Commons (API) cho dia diem chua co anh chon san -> HAY KIEM TRA LAI anh tai ve.
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$dir = Join-Path $root 'apps\web\public\places'
$log = Join-Path $dir 'NGUON-ANH-TU-DONG.txt'
$ua = 'HoiAnAudioGuide/1.0 (student project; image fetch script)'
$ok = 0; $skip = 0; $fail = 0

function Save-Image($url, $out, $label) {
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UserAgent $script:ua -UseBasicParsing -MaximumRedirection 5
    $kb = [math]::Round((Get-Item $out).Length / 1KB)
    Write-Host ('  [da tai]  ' + $label + '  (' + $kb + ' KB)') -ForegroundColor Green
    $script:ok++; return $true
  } catch {
    if (Test-Path $out) { Remove-Item $out }
    Write-Host ('  [LOI]     ' + $label + ' : ' + $_.Exception.Message) -ForegroundColor Red
    $script:fail++; return $false
  }
}

# Tim anh JPEG dau tien (rong >= 600 px) khop truy van; tra ve $null neu khong co.
function Find-Commons($queries) {
  foreach ($q in $queries) {
    $api = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=10' +
           '&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=960&gsrsearch=' + $q
    try { $r = Invoke-RestMethod -Uri $api -UserAgent $script:ua } catch { continue }
    if (-not $r.query) { continue }
    $pages = $r.query.pages.PSObject.Properties.Value | Sort-Object index
    foreach ($p in $pages) {
      $ii = $p.imageinfo[0]
      if ($ii -and $ii.mime -eq 'image/jpeg' -and $ii.width -ge 600) {
        return @{ title = $p.title; url = $ii.thumburl; page = $ii.descriptionurl }
      }
    }
  }
  return $null
}

$fixed = @(
  @{ code = 'nha-co-phung-hung'; file = 'DGJ_0967_-_Phung_Hung_Old_House_%283415825802%29.jpg' }
  @{ code = 'hoi-quan-trieu-chau'; file = 'Trieu_Chau_Assembly_Hall.jpg' }
  @{ code = 'cho-hoi-an'; file = 'Central_Market_Hoi_An.JPG' }
  @{ code = 'bao-tang-gom-su'; file = 'H%E1%BB%99i_An%2C_Museum_of_Trade_Ceramics%2C_2020-01_CN-02.jpg' }
  @{ code = 'bao-tang-hoi-an'; file = 'Hoi_An_Museum_main_building.jpg' }
  @{ code = 'cho-dem-an-hoi'; file = 'Lanterns_in_Hoi_An_4.jpg' }
  @{ code = 'bao-tang-sa-huynh'; file = 'Pottery_burial_jar_Sa_Huynh_Cultue.JPG' }
)
$search = @(
  @{ code = 'hoi-quan-hai-nam'; q = @('incategory%3A%22Hainan%20Assembly%20Hall%22', 'intitle%3AHainan%20%22Hoi%20An%22', '%22Hai%20Nam%22%20%22Hoi%20An%22%20assembly%20hall', '%22H%E1%BB%99i%20qu%C3%A1n%20H%E1%BA%A3i%20Nam%22') }
  @{ code = 'nha-tho-toc-tran'; q = @('intitle%3A%22Tran%20Family%22%20%22Hoi%20An%22', '%22Tran%20family%20chapel%22%20%22Hoi%20An%22', '%22Tran%20family%22%20temple%20%22Hoi%20An%22', '%22Nh%C3%A0%20th%E1%BB%9D%20t%E1%BB%99c%20Tr%E1%BA%A7n%22', 'intitle%3A%22T%E1%BB%99c%20Tr%E1%BA%A7n%22%20%22H%E1%BB%99i%20An%22') }
  @{ code = 'nha-co-quan-thang'; q = @('%22Quan%20Thang%22%20%22Hoi%20An%22', '%22Qu%C3%A2n%20Th%E1%BA%AFng%22%20%22H%E1%BB%99i%20An%22', '%22Nh%C3%A0%20c%E1%BB%95%20Qu%C3%A2n%20Th%E1%BA%AFng%22') }
)

Write-Host '--- Phan 1: anh chon san ---'
foreach ($it in $fixed) {
  $out = Join-Path $dir ($it.code + '.jpg')
  if (Test-Path $out) { Write-Host ('  [co san]  ' + $it.code); $skip++; continue }
  $url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + $it.file + '?width=960'
  [void](Save-Image $url $out $it.code)
  Start-Sleep -Milliseconds 400
}

Write-Host ''
Write-Host '--- Phan 2: tu tim tren Wikimedia Commons ---'
foreach ($it in $search) {
  $out = Join-Path $dir ($it.code + '.jpg')
  if (Test-Path $out) { Write-Host ('  [co san]  ' + $it.code); $skip++; continue }
  $hit = Find-Commons $it.q
  if (-not $hit) {
    Write-Host ('  [khong thay] ' + $it.code + ' : chua co anh tu do phu hop -> giu anh minh hoa, co the nhap "URL anh dai dien" trong Admin.') -ForegroundColor Yellow
    continue
  }
  if (Save-Image $hit.url $out ($it.code + '  <-  ' + $hit.title)) {
    Add-Content -Path $log -Encoding UTF8 -Value ($it.code + ' | ' + $hit.title + ' | ' + $hit.page)
    Write-Host ('            Trang goc: ' + $hit.page)
  }
  Start-Sleep -Milliseconds 400
}

Write-Host ''
Write-Host ('Xong: tai moi ' + $ok + ', bo qua ' + $skip + ', loi ' + $fail + '.')
Write-Host 'Anh o Phan 2 duoc chon TU DONG: mo thu muc apps\web\public\places kiem tra; anh nao sai dia diem thi xoa file .jpg do.'
Write-Host 'Sau do chay lai start.bat roi mo trang web bang cua so an danh (Ctrl+Shift+N) de thay anh moi.'
