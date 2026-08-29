# Vantage Virality OS V2 — Local Backend Server (PowerShell / .NET Native)
# Runs a full HTTP REST API and static web server on http://localhost:3000 without requiring Node/Python.

$port = 3000
$root = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  VANTAGE VIRALITY OS V2 - LOCAL BACKEND SERVER RUNNING   " -ForegroundColor Cyan
    Write-Host "  URL: http://localhost:$port/                            " -ForegroundColor Yellow
    Write-Host "  API: http://localhost:$port/api/health                  " -ForegroundColor Yellow
    Write-Host "  Press Ctrl+C in this terminal to stop the server        " -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Green

    # Data file paths
    $dataPath = Join-Path $root "data"
    if (!(Test-Path $dataPath)) { New-Item -ItemType Directory -Path $dataPath | Out-Null }
    $profileFile = Join-Path $dataPath "creator_profile.json"
    $libraryFile = Join-Path $dataPath "content_library.json"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.AbsolutePath
        $method = $request.HttpMethod

        # CORS Headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if ($method -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        # API ROUTES
        if ($urlPath.StartsWith("/api/")) {
            $response.ContentType = "application/json; charset=utf-8"

            if ($urlPath -eq "/api/health") {
                $payload = @{
                    status = "online"
                    service = "Vantage Virality Intelligence Backend"
                    version = "2.0.0"
                    server_time = (Get-Date).ToString("o")
                    timestamp = [DateTimeOffset]::Now.ToUnixTimeSeconds()
                } | ConvertTo-Json
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($payload)
                $response.StatusCode = 200
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                $response.Close()
                continue
            }

            if ($urlPath -eq "/api/profile") {
                if ($method -eq "GET") {
                    if (Test-Path $profileFile) {
                        $content = Get-Content -Path $profileFile -Raw
                    } else {
                        $content = '{"name":"Arka Mondal","content_types":["reels","shorts","youtube"],"niches":["ai","technology"],"age_range":"18-34","country":"India","goals":"views"}'
                    }
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                    $response.StatusCode = 200
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                    $response.Close()
                    continue
                }
                elseif ($method -eq "POST") {
                    $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
                    $body = $reader.ReadToEnd()
                    $body | Set-Content -Path $profileFile -Force
                    $resJson = '{"success":true,"message":"Profile updated"}'
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($resJson)
                    $response.StatusCode = 200
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                    $response.Close()
                    continue
                }
            }

            if ($urlPath -eq "/api/library") {
                if ($method -eq "GET") {
                    if (Test-Path $libraryFile) {
                        $content = Get-Content -Path $libraryFile -Raw
                    } else {
                        $content = '[]'
                    }
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
                    $response.StatusCode = 200
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                    $response.Close()
                    continue
                }
                elseif ($method -eq "POST") {
                    $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
                    $body = $reader.ReadToEnd()
                    $body | Set-Content -Path $libraryFile -Force
                    $resJson = '{"success":true,"message":"Library synced"}'
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($resJson)
                    $response.StatusCode = 200
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                    $response.Close()
                    continue
                }
            }

            if ($urlPath -eq "/api/score") {
                if ($method -eq "POST") {
                    $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
                    $body = $reader.ReadToEnd()
                    $parsed = $body | ConvertFrom-Json
                    $text = if ($parsed.hook) { $parsed.hook } else { $parsed.title }
                    $len = if ($text) { $text.Length } else { 0 }
                    
                    $hasNum = if ($text -match '\d+') { $true } else { $false }
                    $hasQ = if ($text -match '\?') { $true } else { $false }
                    $hasLoss = if ($text -match '(?i)delete|stop|never|worst|mistake|regret|fail|lies|disaster|broken') { $true } else { $false }
                    $hasPower = if ($text -match '(?i)secret|tested|truth|insane|brutal|proof|architecture|scaled') { $true } else { $false }

                    $curiosity = [Math]::Min(99, 78 + $(if($hasQ){8}else{0}) + $(if($hasPower){8}else{0}) + $(if($len -gt 30){4}else{0}))
                    $stakes = [Math]::Min(99, 75 + $(if($hasLoss){14}else{0}) + $(if($hasNum){6}else{0}))
                    $velocity = [Math]::Min(99, 80 + $(if($len -ge 45 -and $len -le 95){12}else{4}) + $(if($hasNum){5}else{0}))
                    $overall = [Math]::Round(($curiosity * 0.35) + ($stakes * 0.35) + ($velocity * 0.30))

                    $resObj = @{
                        success = $true
                        hook = $text
                        overall_score = $overall
                        tier = if ($overall -ge 90) { "EXPLOSIVE" } elseif ($overall -ge 75) { "STRONG" } else { "CALIBRATED" }
                        signals = @{
                            curiosity_gap = $curiosity
                            stakes_conflict = $stakes
                            algorithmic_velocity = $velocity
                        }
                    } | ConvertTo-Json
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($resObj)
                    $response.StatusCode = 200
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                    $response.Close()
                    continue
                }
            }

            # Fallback 404 API
            $res404 = '{"error":"Not Found"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($res404)
            $response.StatusCode = 404
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        # STATIC FILE SERVING
        $cleanPath = $urlPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($cleanPath)) { $cleanPath = "index.html" }
        $filePath = Join-Path $root $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "text/plain"
            switch ($ext) {
                ".html" { $mime = "text/html; charset=utf-8" }
                ".css"  { $mime = "text/css; charset=utf-8" }
                ".js"   { $mime = "application/javascript; charset=utf-8" }
                ".json" { $mime = "application/json; charset=utf-8" }
                ".png"  { $mime = "image/png" }
                ".jpg"  { $mime = "image/jpeg" }
                ".svg"  { $mime = "image/svg+xml" }
                ".ico"  { $mime = "image/x-icon" }
            }
            $response.ContentType = $mime
            $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $fileBytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found: $cleanPath")
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        $response.Close()
    }
}
catch {
    Write-Host "Server error: $_" -ForegroundColor Red
}
finally {
    $listener.Stop()
}
