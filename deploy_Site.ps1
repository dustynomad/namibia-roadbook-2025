param(
  [string]$TargetFolder = 'namibia-roadbook-2025',
  [string]$UserRepoPath = 'C:\Users\Thomas\Development\namibia-roadbook-2025\namibia-roadbook-2025\Roadbook\dustynomad.github.io',
  [string]$ProjectPath  = (Get-Location).Path,
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

Write-Host '=== Deploy Site (Build -> Live-Repo) ===' -ForegroundColor Cyan
Write-Host ("Project:  {0}" -f $ProjectPath)
Write-Host ("UserRepo: {0}" -f $UserRepoPath)
Write-Host ("Target:   {0}" -f $TargetFolder)

# Checks
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'git nicht gefunden.' }
if (-not (Test-Path $ProjectPath)) { throw ('ProjectPath nicht gefunden: {0}' -f $ProjectPath) }
if (-not (Test-Path $UserRepoPath)) { throw ('UserRepoPath nicht gefunden: {0}' -f $UserRepoPath) }
if (-not (Test-Path (Join-Path $UserRepoPath '.git'))) { throw 'Im UserRepoPath liegt kein .git. Bitte dustynomad.github.io dort klonen.' }

# Build
if (-not $SkipBuild) {
  Write-Host '`nBuild...' -ForegroundColor Cyan
  Push-Location $ProjectPath
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { throw 'npm nicht gefunden.' }
  try { npm ci } catch { npm install }
  npm run build -- --force
  if (-not (Test-Path (Join-Path $ProjectPath 'dist'))) { Pop-Location; throw 'Build fehlgeschlagen: dist/ fehlt.' }
  Pop-Location
}

# Warnung falls base anders ist
$viteCfg = Join-Path $ProjectPath 'vite.config.js'
if (Test-Path $viteCfg) {
  $cfg = Get-Content $viteCfg -Raw
  if ($cfg -notmatch [regex]::Escape("base: '/$TargetFolder/'")) {
    Write-Warning ('Hinweis: In vite.config.js steht base evtl. nicht auf /{0}/.' -f $TargetFolder)
  }
}

# Kopieren
$Dist = Join-Path $ProjectPath 'dist'
$Dest = Join-Path $UserRepoPath $TargetFolder
Write-Host ("`nSpiegele Build -> {0}" -f $Dest) -ForegroundColor Cyan

if (-not (Test-Path $Dest)) { New-Item -ItemType Directory -Path $Dest | Out-Null }

if (Get-Command robocopy -ErrorAction SilentlyContinue) {
  & robocopy $Dist $Dest /MIR /NFL /NDL /NP /R:2 /W:1 | Out-Null
} else {
  Get-ChildItem $Dest -Force -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
  Copy-Item -Recurse -Force (Join-Path $Dist '*') $Dest
}

# SPA-Fallback + Build-Stempel
$IndexHtml = Join-Path $Dest 'index.html'
$NotFound  = Join-Path $Dest '404.html'
if (Test-Path $IndexHtml) { Copy-Item $IndexHtml $NotFound -Force }
'Build: {0}' -f (Get-Date -Format 'yyyy-MM-ddTHH:mm:ssK') | Out-File (Join-Path $Dest 'build-info.txt') -Encoding utf8


# --- Landing (optional): landing/ ins Root vom User-Repo kopieren ---
$LandingSrc = Join-Path $ProjectPath 'landing'
if (Test-Path $LandingSrc) {
  Write-Host ("`nCopy landing -> {0}" -f $UserRepoPath) -ForegroundColor Cyan
  if (Get-Command robocopy -ErrorAction SilentlyContinue) {
    # /E: nur kopieren (auch Unterordner), NICHT spiegeln – CNAME bleibt erhalten
    & robocopy $LandingSrc $UserRepoPath /E /NFL /NDL /NP /R:2 /W:1 | Out-Null
  } else {
    Copy-Item -Recurse -Force (Join-Path $LandingSrc '*') $UserRepoPath
  }
}




# Commit & Push im Live-Repo
Write-Host "`nGit (User-Repo) Status/Push" -ForegroundColor Cyan
git -C $UserRepoPath remote -v
git -C $UserRepoPath add -A

$changes = git -C $UserRepoPath status --porcelain
if ($changes) {
  $msg = ('Deploy {0}: {1}' -f $TargetFolder, (Get-Date -Format 'yyyy-MM-dd HH:mm'))
  git -C $UserRepoPath commit -m $msg | Out-Null

  $pushed = $true
  try { git -C $UserRepoPath push -u origin main } catch { $pushed = $false }
  if (-not $pushed -or $LASTEXITCODE -ne 0) {
    Write-Warning 'Push fehlgeschlagen - mache fetch/rebase und versuche erneut.'
    git -C $UserRepoPath fetch origin
    try { git -C $UserRepoPath rev-parse --verify main 2>$null | Out-Null } catch { git -C $UserRepoPath checkout -b main }
    git -C $UserRepoPath pull --rebase origin main 2>$null
    git -C $UserRepoPath push -u origin main
  }
} else {
  Write-Host 'Keine Aenderungen – nichts zu pushen.' -ForegroundColor Yellow
}

Write-Host ''
Write-Host ('Live URL: https://dusty-nomads.org/{0}/' -f $TargetFolder) -ForegroundColor Green
