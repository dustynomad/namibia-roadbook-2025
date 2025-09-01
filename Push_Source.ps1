param(
  # Standard: aktueller Ordner ist das Projekt-Repo
  [string]$ProjectPath = (Get-Location).Path,
  # Optional: falls du die Remote-URL einmal neu setzen willst
  [string]$RemoteUrl = ""
)

$ErrorActionPreference = "Stop"
Write-Host "=== Push Source (Projekt-Repo) ===" -ForegroundColor Cyan
Write-Host "ProjectPath: $ProjectPath"

if (-not (Test-Path (Join-Path $ProjectPath ".git"))) { throw "Kein .git im ProjectPath. Bitte richtigen Ordner angeben." }

# optional: Remote setzen
if ($RemoteUrl) {
  git -C $ProjectPath remote set-url origin $RemoteUrl
  git -C $ProjectPath remote set-url --push origin $RemoteUrl
}

Write-Host "`n▶ Remote:" -ForegroundColor Cyan
git -C $ProjectPath remote -v

# Branch sicherstellen
git -C $ProjectPath branch -M main 2>$null | Out-Null

# Änderungen committen (falls vorhanden)
git -C $ProjectPath add -A
$srcChanges = git -C $ProjectPath status --porcelain
if ($srcChanges) {
  $msg = ("Source update: {0}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm'))
  git -C $ProjectPath commit -m $msg | Out-Null
} else {
  Write-Host "Keine Source-Änderungen – nichts zu committen." -ForegroundColor Yellow
}

# Upstream abgleichen & pushen
git -C $ProjectPath fetch origin
try {
  git -C $ProjectPath pull --rebase origin main
} catch {
  Write-Warning "pull --rebase: $_"
}
git -C $ProjectPath push -u origin main

Write-Host "`n✅ Source ist im Projekt-Repo." -ForegroundColor Green
