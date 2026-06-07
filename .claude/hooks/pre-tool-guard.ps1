#!/usr/bin/env pwsh
# pre-tool-guard.ps1 — ข่าว AI Claudecode project
# Triggered PreToolUse — guards against destructive operations

param()

$json = @()
while ($null -ne ($line = [Console]::In.ReadLine())) {
    $json += $line
}
$rawJson = $json -join "`n"

try {
    $data      = $rawJson | ConvertFrom-Json -ErrorAction Stop
    $toolName  = $data.tool_name
    $toolInput = $data.tool_input
    $timestamp = Get-Date -Format "HH:mm:ss"

    $dangerPatterns = @(
        'rm -rf',
        'rmdir /s',
        'format ',
        'del /f /s',
        'DROP TABLE',
        'DROP DATABASE',
        'TRUNCATE',
        'DELETE FROM',
        '--force',
        'git reset --hard',
        'git push --force',
        'git push -f'
    )

    if ($toolName -eq "Bash") {
        $cmd = if ($toolInput.PSObject.Properties['command']) { $toolInput.command } else { "" }

        foreach ($pattern in $dangerPatterns) {
            if ($cmd -imatch [regex]::Escape($pattern)) {
                Write-Host ""
                Write-Host "⚠️  Pre-Tool Guard [ข่าว AI Claudecode]: พบคำสั่งที่อาจเป็นอันตราย" -ForegroundColor Yellow
                Write-Host "   Pattern: $pattern" -ForegroundColor DarkYellow
                Write-Host "   Command: $($cmd.Substring(0, [math]::Min(80, $cmd.Length)))..." -ForegroundColor DarkGray
                Write-Host ""
                break
            }
        }
    }

} catch {
    exit 0
}

exit 0
