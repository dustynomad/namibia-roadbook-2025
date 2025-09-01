param(
  # URL-Pfad und Zielordner im Live-Repo
  [string]$TargetFolder = "namibia-roadbook-2025",
  # Pfad zum Live-Repo dustynomad.github.io  (DEIN Pfad)
  [string]$UserRepoPath = "C:\Users\Thomas\Development\namibia-roadbook-2025\namibia-roadbook-2025\Roadbook\dustynomad.github.io",
  # Projektpfad (Standard = aktueller Ordner)
  [string]$ProjectPath = (Get-Location).Path,
  # Nur kopieren & pushen (Build überspringen)?
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
Write-Host "=== Deploy Site (Build → Live-Repo) ===" -ForegroundColor Cyan
Write-Host "Project:  $ProjectPath"
Write-Host "UserRepo: $UserRepoPath"
Write-Host "Target:   $TargetFolder"

# 0) Sanity-Checks
if (-not (Test-Path (Join-Path $UserRepoPath ".git"))) { throw "Kein .git im UserRepoPath. Bitte dustynomad.github.io an genau diesem Pfad klonen." }

# 1) Build (optional)
if (-not $SkipBuild) {
  Write-Host "`n▶ Build…" -ForegroundColor Cyan
  Push-Location $ProjectPath
  try { npm ci } catch { npm install }
  npm run build -- --force
  if (-not (Test-Path (Join-Path $ProjectPath "dist"))) { throw "Build fehlgeschlagen: dist/ fehlt." }
  Pop-Location
}

# Kurzer Check: vite base
$viteCfg = Join-Path $ProjectPath "vite.config.js"
if (Test-Path $viteCfg) {
  $cfg = Get-Content $viteCfg -Raw
  if ($cfg -notmatch [regex]::Escape("base: '/$TargetFolder/'")) {
    Write-Warning "In vite.config.js scheint base NICHT '/$TargetFolder/' zu sein. Pfade könnten brechen."
  }
}

# 2) Kopieren (robust spiegeln)
$Dest = Join-Path $UserRepoPath $TargetFolder
Write-Host "`n▶ Kopiere Build → $Dest" -ForegroundColor Cyan
& robocopy (Join-Path $ProjectPath "dist") $Dest /MIR | Out-Null

# SPA-Fallback & Build-Stempel
Copy-Item (Join-Path $Dest "index.html") (Join-Path $Dest "404.html") -Force
"Build: $(Get-Date -Format o)" | Out-File (Join-Path $Dest "build-info.txt") -Encoding utf8

# 3) Commit & Push im Live-Repo
Write-Host "`n▶ Git (User-Repo) Status/Push" -ForegroundColor Cyan
git -C $UserRepoPath remote -v
git -C $UserRepoPath add -A
$changes = git -C $UserRepoPath status --porcelain
if ($changes) {
  $msg = ("Deploy {0}: {1}" -f $TargetFolder, (Get-Date -Format 'yyyy-MM-dd HH:mm'))
  git -C $UserRepoPath commit -m $msg | Out-Null
  try {
    git -C $UserRepoPath push -u origin main
  } catch {
    Write-Warning "Push fehlgeschlagen – hole & rebase, dann nochmal…"
    git -C $UserRepoPath fetch origin
    try { git -C $UserRepoPath rev-parse --verify main 2>$null | Out-Null } catch { git -C $UserRepoPath checkout -b main }
    git -C $UserRepoPath pull --rebase origin main 2>$null
    git -C $UserRepoPath push -u origin main
  }
} else {
  Write-Host "Keine Änderungen – nichts zu pushen." -ForegroundColor Yellow
}

Write-Host "`n✅ Live: https://dusty-nomads.org/$TargetFolder/" -ForegroundColor Green
