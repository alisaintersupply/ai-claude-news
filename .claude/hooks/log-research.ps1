#!/usr/bin/env pwsh
# log-research.ps1 — ข่าว AI Claudecode project
# Triggered PostToolUse on WebSearch / WebFetch
# Appends search activity to a daily research log

param()

$json = @()
while ($null -ne ($line = [Console]::In.ReadLine())) {
    $json += $line
}
$rawJson = $json -join "`n"

try {
    $data = $rawJson | ConvertFrom-Json -ErrorAction Stop

    $toolName  = $data.tool_name
    $toolInput = $data.tool_input
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $today     = Get-Date -Format "yyyy-MM-dd"
    $logDir    = Join-Path $PSScriptRoot ".." "logs"
    $logFile   = Join-Path $logDir "research-$today.md"

    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    if (-not (Test-Path $logFile)) {
        $header = @"
# Research Log — $today [ข่าว AI Claudecode]

| Time | Tool | Query / URL |
|------|------|-------------|
"@
        Set-Content -Path $logFile -Value $header -Encoding UTF8
    }

    $entry = switch ($toolName) {
        "WebSearch" {
            $q = if ($toolInput.PSObject.Properties['query']) { $toolInput.query } else { "(no query)" }
            "| $timestamp | WebSearch | ``$q`` |"
        }
        "WebFetch" {
            $u = if ($toolInput.PSObject.Properties['url']) { $toolInput.url } else { "(no url)" }
            "| $timestamp | WebFetch | $u |"
        }
        default {
            "| $timestamp | $toolName | (other) |"
        }
    }

    Add-Content -Path $logFile -Value $entry -Encoding UTF8

} catch {
    exit 0
}

exit 0
