# Vantage Virality OS - Native TcpListener HTTP Server on Port 3000
# Zero-permission, pure .NET socket server that works without admin rights on Windows.

$port = 3000
$root = $PSScriptRoot

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $port)
$listener.Start()

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  VANTAGE VIRALITY OS - LOCAL HTTP SERVER ACTIVE          " -ForegroundColor Cyan
Write-Host "  URL: http://localhost:$port/                            " -ForegroundColor Yellow
Write-Host "  API: http://localhost:$port/api/health                  " -ForegroundColor Yellow
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
        while ($true) {
            $line = $reader.ReadLine()
            if ([string]::IsNullOrEmpty($line)) { break }
            if ($line.ToLower().StartsWith("content-length:")) {
                $contentLength = [int]($line.Substring(15).Trim())
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
            $headerStr = "HTTP/1.1 204 No Content`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: *`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $client.Close()
            continue
        }

        # Handle API Routes
        if ($urlPath -eq "/api/health" -or $urlPath -eq "/health") {
            $json = '{"status":"online","service":"Vantage Virality OS","version":"2.0.0"}'
            $bBytes = [System.Text.Encoding]::UTF8.GetBytes($json)
            $headerStr = "HTTP/1.1 200 OK`r`nContent-Type: application/json; charset=utf-8`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($bBytes.Length)`r`nConnection: close`r`n`r`n"
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

            $headerStr = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($fileBytes.Length)`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $stream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $notFound = "404 Not Found"
            $nBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
            $headerStr = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($nBytes.Length)`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($headerStr)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $stream.Write($nBytes, 0, $nBytes.Length)
        }

        $client.Close()
    } catch {
        # ignore transient socket disconnects
    }
}
