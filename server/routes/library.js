/**
 * Content Library Route Handler
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

async function handleLibrary(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
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
    const items = db.getLibrary(userId);
    res.statusCode = 200;
    res.end(JSON.stringify(items, null, 2));
    return;
  }

  if (req.method === 'POST') {
    try {
      const payload = await parseBody(req);
      let items = db.getLibrary(userId);

      if (Array.isArray(payload)) {
        items = db.saveLibrary(userId, payload);
      } else if (payload && payload.id) {
        const existingIdx = items.findIndex(i => i.id === payload.id);
        if (existingIdx >= 0) {
          items[existingIdx] = { ...items[existingIdx], ...payload };
          db.saveLibrary(userId, items);
        } else {
          db.addLibraryItem(userId, payload);
          items = db.getLibrary(userId);
        }
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, message: 'Library saved', count: items.length }, null, 2));
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON body', details: err.message }));
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const data = await parseBody(req);
      if (data && data.id) {
        db.deleteLibraryItem(userId, data.id);
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, message: 'Idea deleted' }));
        return;
      }
    } catch (e) {}
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}

module.exports = { handleLibrary };
