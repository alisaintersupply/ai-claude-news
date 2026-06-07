#!/usr/bin/env pwsh
# token-warning.ps1 — ข่าว AI Claudecode project
# Triggered on Stop event — warns when context token usage exceeds 60%

param()

$json = @()
while ($null -ne ($line = [Console]::In.ReadLine())) {
    $json += $line
}
$rawJson = $json -join "`n"

try {
    $data = $rawJson | ConvertFrom-Json -ErrorAction Stop

    $usage = $data.usage
    if ($null -eq $usage) { exit 0 }

    $inputTokens  = if ($usage.PSObject.Properties['input_tokens'])               { [int]$usage.input_tokens }               else { 0 }
    $outputTokens = if ($usage.PSObject.Properties['output_tokens'])              { [int]$usage.output_tokens }              else { 0 }
    $cacheRead    = if ($usage.PSObject.Properties['cache_read_input_tokens'])    { [int]$usage.cache_read_input_tokens }    else { 0 }
    $cacheWrite   = if ($usage.PSObject.Properties['cache_creation_input_tokens']) { [int]$usage.cache_creation_input_tokens } else { 0 }

    $totalTokens  = $inputTokens + $outputTokens + $cacheRead + $cacheWrite
    $contextLimit = 200000

    if ($totalTokens -eq 0) { exit 0 }

    $pct    = [math]::Round(($totalTokens / $contextLimit) * 100, 1)
    $filled = [math]::Min([math]::Floor($pct / 5), 20)
    $bar    = ("█" * $filled) + ("░" * (20 - $filled))

    if ($pct -lt 60) { exit 0 }

    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray

    if ($pct -ge 90) {
        Write-Host "🔴 TOKEN CRITICAL — $pct% ใช้ไปแล้ว [ข่าว AI Claudecode]" -ForegroundColor Red
        Write-Host "   บริบทใกล้เต็มแล้ว! แนะนำให้เริ่ม session ใหม่" -ForegroundColor Red
    } elseif ($pct -ge 75) {
        Write-Host "🟠 TOKEN HIGH — $pct% ใช้ไปแล้ว [ข่าว AI Claudecode]" -ForegroundColor DarkYellow
        Write-Host "   พิจารณาสรุปงานและเริ่ม session ใหม่เร็วๆ นี้" -ForegroundColor DarkYellow
    } else {
        Write-Host "⚠️  TOKEN WARNING — $pct% ใช้ไปแล้ว [ข่าว AI Claudecode]" -ForegroundColor Yellow
        Write-Host "   บริบทเริ่มเต็ม ควรวางแผนจบงานในไม่ช้า" -ForegroundColor Yellow
    }

    Write-Host "   [$bar] $totalTokens / $contextLimit tokens" -ForegroundColor Cyan
    Write-Host "   Input: $inputTokens  Output: $outputTokens  Cache: $cacheRead read / $cacheWrite write" -ForegroundColor DarkGray
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""

} catch {
    exit 0
}

exit 0
