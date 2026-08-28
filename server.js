/**
 * VANTAGE VIRALITY OS V2 — Node.js Backend Server
 * Built with zero external dependencies (pure Node.js http/fs modules)
 * Run: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const PROFILE_FILE = path.join(DATA_DIR, 'creator_profile.json');
const LIBRARY_FILE = path.join(DATA_DIR, 'content_library.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // API Endpoints
  if (url.pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (url.pathname === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'online',
        service: 'Vantage Virality Intelligence Backend',
        version: '2.0.0',
        server_time: new Date().toISOString()
      }));
      return;
    }

    if (url.pathname === '/api/profile') {
      if (req.method === 'GET') {
        const content = fs.existsSync(PROFILE_FILE) ? fs.readFileSync(PROFILE_FILE, 'utf8') : JSON.stringify({ name: 'Arka Mondal', niches: ['ai', 'technology'] });
        res.writeHead(200);
        res.end(content);
        return;
      }
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          fs.writeFileSync(PROFILE_FILE, body);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Profile saved' }));
        });
        return;
      }
    }

    if (url.pathname === '/api/library') {
      if (req.method === 'GET') {
        const content = fs.existsSync(LIBRARY_FILE) ? fs.readFileSync(LIBRARY_FILE, 'utf8') : '[]';
        res.writeHead(200);
        res.end(content);
        return;
      }
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          fs.writeFileSync(LIBRARY_FILE, body);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Library saved' }));
        });
        return;
      }
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Vantage Virality OS Backend running on http://localhost:${PORT}`);
});
