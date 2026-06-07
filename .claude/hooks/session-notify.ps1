#!/usr/bin/env pwsh
# session-notify.ps1 — ข่าว AI Claudecode project
# Triggered on Notification event
# Shows Windows toast notification for Claude alerts

param()

$json = @()
while ($null -ne ($line = [Console]::In.ReadLine())) {
    $json += $line
}
$rawJson = $json -join "`n"

try {
    $data    = $rawJson | ConvertFrom-Json -ErrorAction Stop
    $message = if ($data.PSObject.Properties['message']) { $data.message } else { "Claude ต้องการความสนใจ" }
    $title   = "🤖 ข่าว AI Claudecode"

    $burntToast = Get-Module -ListAvailable -Name BurntToast -ErrorAction SilentlyContinue
    if ($burntToast) {
        Import-Module BurntToast
        New-BurntToastNotification -Text $title, $message -AppLogo $null
    } else {
        [Console]::Beep(880, 300)
        Write-Host ""
        Write-Host "🔔 $title" -ForegroundColor Cyan
        Write-Host "   $message" -ForegroundColor White
        Write-Host ""
    }

} catch {
    exit 0
}

exit 0
