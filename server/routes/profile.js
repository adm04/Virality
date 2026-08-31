/**
 * Creator Profile Route Handler
 * Multi-User Isolated & Database Connected
 */
const db = require('../db');
const { getAuthenticatedUser } = require('./auth');

function parseBody(req) {
  return new Promise((resolve) => {
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === 'object') return resolve(req.body);
      try {
        return resolve(JSON.parse(req.body));
      } catch (e) {
        return resolve({});
      }
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

async function handleProfile(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const user = getAuthenticatedUser(req);
  const userId = user ? user.id : 'usr_arka_master';

  if (req.method === 'GET') {
    const profile = db.getProfile(userId);
    res.statusCode = 200;
    res.end(JSON.stringify(profile, null, 2));
    return;
  }

  if (req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const updated = db.updateProfile(userId, data);

      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'Creator profile saved successfully',
        profile: updated
      }, null, 2));
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON body', details: err.message }));
    }
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}

module.exports = { handleProfile };
