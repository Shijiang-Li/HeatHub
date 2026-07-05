$ProjectRoot = Split-Path -Parent $PSScriptRoot
$NodePath = Join-Path $ProjectRoot ".tools\node-v22.13.1-win-x64"
$GitPath = Join-Path $ProjectRoot ".tools\git\cmd"
$VercelPath = Join-Path $ProjectRoot ".tools\npm-global"
$SupabasePath = Join-Path $ProjectRoot ".tools\supabase"
$GitHubPath = Join-Path $ProjectRoot ".tools\gh\bin"

$env:Path = @($NodePath, $GitPath, $VercelPath, $SupabasePath, $GitHubPath, $env:Path) -join ";"

Write-Host "HeatHub local tools are ready."
Write-Host "node:     $(node --version)"
Write-Host "npm:      $(npm --version)"
Write-Host "git:      $(git --version)"
Write-Host "gh:       $(gh --version | Select-Object -First 1)"
Write-Host "vercel:   $(vercel --version)"
Write-Host "supabase: $(supabase --version)"
Write-Host ""
Write-Host "Use this shell for local deployment commands."
