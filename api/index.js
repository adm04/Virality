/**
 * Vercel Serverless Function Entry Point for Vantage REST API
 */

const { handleHealth } = require('../server/routes/health');
const { handleProfile } = require('../server/routes/profile');
const { handleLibrary } = require('../server/routes/library');
const { handleScore } = require('../server/routes/trends');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (pathname === '/api/health' || pathname === '/health') {
    return handleHealth(req, res);
  }
  if (pathname === '/api/profile' || pathname === '/profile') {
    return handleProfile(req, res);
  }
  if (pathname === '/api/library' || pathname === '/library') {
    return handleLibrary(req, res);
  }
  if (pathname === '/api/score' || pathname === '/score') {
    return handleScore(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'Endpoint not found', path: pathname }));
};
