/**
 * VANTAGE VIRALITY OS V2 — Node.js Backend Server
 * Built with zero external dependencies (pure Node.js http/fs/path modules)
 * Run: npm start OR node server/server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const { handleHealth } = require('./routes/health');
const { handleProfile } = require('./routes/profile');
const { handleLibrary } = require('./routes/library');
const { handleScore } = require('./routes/trends');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // REST API Route Dispatcher
  if (url.pathname.startsWith('/api/')) {
    if (url.pathname === '/api/health') {
      return handleHealth(req, res);
    }
    if (url.pathname === '/api/profile') {
      return handleProfile(req, res);
    }
    if (url.pathname === '/api/library') {
      return handleLibrary(req, res);
    }
    if (url.pathname === '/api/score') {
      return handleScore(req, res);
    }

    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'API Endpoint not found', path: url.pathname }));
    return;
  }

  // Static File Dispatcher
  let safePath = path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(ROOT_DIR, safePath === '/' ? 'index.html' : safePath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(ROOT_DIR, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
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

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`==========================================================`);
    console.log(`  VANTAGE VIRALITY OS V2 - NODE.JS BACKEND RUNNING        `);
    console.log(`  URL: http://localhost:${PORT}/                            `);
    console.log(`  API: http://localhost:${PORT}/api/health                  `);
    console.log(`  Press Ctrl+C to stop the server                         `);
    console.log(`==========================================================`);
  });
}

module.exports = server;
