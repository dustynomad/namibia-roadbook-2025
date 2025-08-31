param(
  [string]$TargetFolder = "namibia-roadbook-2025",
  [string]$UserRepoPath = "C:\Users\Thomas\Development\namibia-roadbook-2025\namibia-roadbook-2025\Roadbook\dustynomad.github.io",
  [switch]$SkipSourcePush   # setzt du dieses Flag, wird Schritt „Source pushen“ übersprungen
)

$ErrorActionPreference = "Stop"
$ProjectPath = (Get-Location).Path
Write-Host "=== Deploy (Source + Build) ===" -ForegroundColor Cyan
Write-Host "Project:  $ProjectPath"
Write-Host "UserRepo: $UserRepoPath"
Write-Host "Target:   $TargetFolder"

# 0) Source ins Projekt-Repo pushen (optional)
if (-not $SkipSourcePush) {
  Write-Host "`n▶ Source commit & push (Projekt-Repo)..." -ForegroundColor Cyan
  git add -A
  $srcChanges = git status --porcelain
  if ($srcChanges) {
    $srcMsg = ("Source update: {0}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm'))
    git commit -m $srcMsg | Out-Null
  } else {
    Write-Host "Keine Source-Änderungen – nichts zu committen." -ForegroundColor Yellow
  }
  git push -u origin main
}

# 1) Build
Write-Host "`n▶ Build..." -ForegroundColor Cyan
try { npm ci } catch { npm install }
npm run build -- --force
if (-not (Test-Path ".\dist")) { throw "Build fehlgeschlagen: dist/ fehlt." }

# 2) Build → User-Repo kopieren
$Dest = Join-Path $UserRepoPath $TargetFolder
Write-Host "`n▶ Kopiere nach: $Dest" -ForegroundColor Cyan
if (-not (Test-Path (Join-Path $UserRepoPath ".git"))) { throw "Kein .git im User-Repo ($UserRepoPath). Bitte richtig klonen." }

& robocopy ".\dist" $Dest /MIR | Out-Null
Copy-Item (Join-Path $Dest "index.html") (Join-Path $Dest "404.html") -Force
"Build: $(Get-Date -Format o)" | Out-File (Join-Path $Dest "build-info.txt") -Encoding utf8

# 3) Commit & Push im User-Repo
Write-Host "`n▶ Commit & Push (User-Repo)..." -ForegroundColor Cyan
git -C $UserRepoPath add -A
$changes = git -C $UserRepoPath status --porcelain
if ($changes) {
  $msg = ("Deploy {0}: {1}" -f $TargetFolder, (Get-Date -Format 'yyyy-MM-dd HH:mm'))
  git -C $UserRepoPath commit -m $msg | Out-Null
  git -C $UserRepoPath push -u origin main
} else {
  Write-Host "Keine Änderungen – nichts zu pushen." -ForegroundColor Yellow
}

Write-Host "`n✅ Fertig: https://dusty-nomads.org/$TargetFolder/" -ForegroundColor Green
