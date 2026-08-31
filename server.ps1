# Vantage Virality OS - Native TcpListener HTTP Server on Port 3000
# Zero-permission, pure .NET socket server that works without admin rights on Windows.

$port = 3000
$root = $PSScriptRoot

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $port)
$listener.Start()

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  VANTAGE VIRALITY OS - LOCAL SAAS SERVER ACTIVE          " -ForegroundColor Cyan
Write-Host "  URL: http://localhost:$port/                            " -ForegroundColor Yellow
Write-Host "  API: http://localhost:$port/api/health                  " -ForegroundColor Yellow
Write-Host "  AUTH: http://localhost:$port/api/auth/me                " -ForegroundColor Yellow
Write-Host "  Press Ctrl+C in this window to stop the server          " -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
}

# In-memory storage for PowerShell server
$dbFile = Join-Path $root "data\vantage_database.json"
if (!(Test-Path (Join-Path $root "data"))) { New-Item -ItemType Directory -Path (Join-Path $root "data") -Force | Out-Null }

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)

        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($requestLine)) {
            $client.Close()
            continue
        }

        $parts = $requestLine.Split(' ')
        $method = $parts[0]
        $rawPath = if ($parts.Length -gt 1) { $parts[1] } else { "/" }
        $urlPath = $rawPath.Split('?')[0]

        # Read remaining headers
        $contentLength = 0
        $authHeader = ""
        while ($true) {
            $line = $reader.ReadLine()
            if ([string]::IsNullOrEmpty($line)) { break }
            if ($line.ToLower().StartsWith("content-length:")) {
                $contentLength = [int]($line.Substring(15).Trim())
            }
            if ($line.ToLower().StartsWith("authorization:")) {
                $authHeader = $line.Substring(14).Trim()
            }
        }

        # Read body if present
        $body = ""
        if ($contentLength -gt 0) {
            $buffer = New-Object char[] $contentLength
            $read = $reader.ReadBlock($buffer, 0, $contentLength)
            $body = New-Object string ($buffer, 0, $read)
        }

        # CORS preflight
        if ($method -eq "OPTIONS") {
            $headerStr = "HTTP/1.1 204 No Content`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, DELETE, OPTIONS`r`nAccess-Control-Allow-Headers: *`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $client.Close()
            continue
        }

        # Handle API Routes
        if ($urlPath.StartsWith("/api/")) {
            $respJson = "{}"
            $statusCode = "200 OK"

            if ($urlPath -eq "/api/health" -or $urlPath -eq "/health") {
                $respJson = '{"status":"online","service":"Vantage Virality OS","version":"2.0.0","server_time":"' + (Get-Date -Format "o") + '"}'
            }
            elseif ($urlPath.StartsWith("/api/auth")) {
                if ($urlPath -eq "/api/auth/me") {
                    $respJson = '{"authenticated":true,"user":{"id":"usr_arka_master","name":"Arka Mondal","email":"arkadeb.mondal@example.com","tier":"pro"}}'
                }
                elseif ($urlPath -eq "/api/auth/login" -or $urlPath -eq "/api/auth/register" -or $urlPath -eq "/api/auth/guest") {
                    $respJson = '{"success":true,"token":"demo_jwt_token_2026","user":{"id":"usr_arka_master","name":"Arka Mondal","email":"arkadeb.mondal@example.com","tier":"pro"}}'
                }
                else {
                    $respJson = '{"success":true,"message":"OK"}'
                }
            }
            elseif ($urlPath -eq "/api/profile") {
                if ($method -eq "POST" -and -not [string]::IsNullOrEmpty($body)) {
                    $respJson = '{"success":true,"message":"Profile saved","profile":' + $body + '}'
                } else {
                    $respJson = '{"name":"Arka Mondal","email":"arkadeb.mondal@example.com","niches":["ai","technology"],"content_types":["reels","shorts","youtube"],"country":"India","goals":"views"}'
                }
            }
            elseif ($urlPath -eq "/api/library") {
                if ($method -eq "POST" -and -not [string]::IsNullOrEmpty($body)) {
                    $respJson = '{"success":true,"message":"Library updated"}'
                } else {
                    $respJson = '[{"id":"lib-1","title":"I gave 3 AI agents $1,000 each and let them trade for 30 days","hook":"I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.","score":98,"stage":"filming"}]'
                }
            }
            elseif ($urlPath.StartsWith("/api/trends")) {
                $respJson = '{"success":true,"trends":[{"id":"yt-1","topic":"AI Autonomous Trading Agents","outlierScore":94,"title":"I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model."}]}'
            }
            else {
                $respJson = '{"success":true,"message":"API Response"}'
            }

            $bBytes = [System.Text.Encoding]::UTF8.GetBytes($respJson)
            $headerStr = "HTTP/1.1 $statusCode`r`nContent-Type: application/json; charset=utf-8`r`nCache-Control: no-cache, no-store, must-revalidate`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($bBytes.Length)`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $stream.Write($bBytes, 0, $bBytes.Length)
            $client.Close()
            continue
        }

        # Static File Serving
        $relPath = $urlPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relPath)) { $relPath = "index.html" }
        $filePath = Join-Path $root $relPath

        if (!(Test-Path $filePath) -or (Get-Item $filePath).PSIsContainer) {
            $filePath = Join-Path $root "index.html"
        }

        if (Test-Path $filePath) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }
            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)

            $headerStr = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nCache-Control: no-cache, no-store, must-revalidate`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($fileBytes.Length)`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $stream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $headerStr = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nConnection: close`r`n`r`n404 Not Found"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
            $stream.Write($hBytes, 0, $hBytes.Length)
        }

        $client.Close()
    }
    catch {
        # Catch and continue on socket errors
    }
}
