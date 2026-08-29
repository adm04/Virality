/**
 * Vercel Serverless Function Entry Point for Vantage REST API
 */

const { handleHealth } = require('../server/routes/health');
const { handleProfile } = require('../server/routes/profile');
const { handleLibrary } = require('../server/routes/library');
const { handleScore } = require('../server/routes/trends');

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      return res.status(204).end();
    }
    res.writeHead(204);
    return res.end();
  }

  try {
    const rawUrl = req.url || '';
    let pathname = rawUrl;
    try {
      const parsedUrl = new URL(rawUrl, `http://${req.headers.host || 'localhost'}`);
      pathname = parsedUrl.pathname;
    } catch (e) {
      pathname = rawUrl.split('?')[0];
    }

    if (pathname === '/api/health' || pathname === '/health' || pathname === '/api') {
      return handleHealth(req, res);
    }
    if (pathname === '/api/profile' || pathname === '/profile') {
      return await handleProfile(req, res);
    }
    if (pathname === '/api/library' || pathname === '/library') {
      return await handleLibrary(req, res);
    }
    if (pathname === '/api/score' || pathname === '/score') {
      return await handleScore(req, res);
    }

    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
  } catch (err) {
    console.error('Serverless Handler Error:', err);
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
};
