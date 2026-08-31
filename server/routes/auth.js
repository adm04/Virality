/**
 * ============================================================================
 * VANTAGE VIRALITY OS — AUTHENTICATION ROUTE HANDLERS
 * JWT & Session Management, Password Hashing, Multi-User Isolation
 * ============================================================================
 */

const db = require('../db');

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

function extractBearerToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return null;
}

function getAuthenticatedUser(req) {
  const token = extractBearerToken(req);
  if (!token) return null;
  const payload = db.verifyToken(token);
  if (!payload || !payload.userId) return null;
  return db.findUserById(payload.userId);
}

async function handleAuth(req, res, subPath = '') {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = subPath || url.pathname.replace(/^\/api\/auth\/?/, '') || 'me';

  // 1. POST /api/auth/register
  if (action === 'register' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const name = (data.name || '').trim();
      const email = (data.email || '').trim();
      const password = (data.password || '').trim();

      if (!email || !email.includes('@')) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'A valid email address is required.' }));
        return;
      }
      if (!password || password.length < 6) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Password must be at least 6 characters long.' }));
        return;
      }

      const user = db.createUser(name || 'Creator', email, password);
      const token = db.generateToken(user);
      const profile = db.getProfile(user.id);

      res.statusCode = 201;
      res.end(JSON.stringify({
        success: true,
        message: 'Account created successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          tier: user.tier
        },
        profile
      }, null, 2));
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 2. POST /api/auth/login
  if (action === 'login' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const email = (data.email || '').trim();
      const password = (data.password || '').trim();

      if (!email || !password) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Email and password are required.' }));
        return;
      }

      const user = db.findUserByEmail(email);
      if (!user || user.password_hash !== db.hashPassword(password)) {
        res.statusCode = 401;
        res.end(JSON.stringify({ error: 'Invalid email or password.' }));
        return;
      }

      user.last_login = new Date().toISOString();
      db.persist();

      const token = db.generateToken(user);
      const profile = db.getProfile(user.id);
      const library = db.getLibrary(user.id);

      res.statusCode = 200;
      res.end(JSON.stringify({
        success: true,
        message: 'Logged in successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          tier: user.tier
        },
        profile,
        library_count: library.length
      }, null, 2));
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 3. POST /api/auth/guest (Instant Demo Login)
  if (action === 'guest' && req.method === 'POST') {
    const defaultUser = db.findUserByEmail('arkadeb.mondal@example.com') || db.data.users[0];
    const token = db.generateToken(defaultUser);
    const profile = db.getProfile(defaultUser.id);
    const library = db.getLibrary(defaultUser.id);

    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      message: 'Demo creator access activated',
      token,
      user: {
        id: defaultUser.id,
        name: defaultUser.name,
        email: defaultUser.email,
        tier: defaultUser.tier
      },
      profile,
      library
    }, null, 2));
    return;
  }

  // 4. GET /api/auth/me (Current Session Verification)
  if (action === 'me' && req.method === 'GET') {
    const user = getAuthenticatedUser(req);
    if (!user) {
      // Return guest profile fallback
      const guestUser = db.data.users[0];
      const guestProfile = db.getProfile(guestUser.id);
      res.statusCode = 200;
      res.end(JSON.stringify({
        authenticated: false,
        user: {
          id: guestUser.id,
          name: guestUser.name,
          email: guestUser.email,
          tier: 'guest'
        },
        profile: guestProfile
      }, null, 2));
      return;
    }

    const profile = db.getProfile(user.id);
    const library = db.getLibrary(user.id);
    const apiKeys = db.getApiKeys(user.id);

    res.statusCode = 200;
    res.end(JSON.stringify({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tier: user.tier,
        last_login: user.last_login
      },
      profile,
      library,
      has_custom_openai_key: Boolean(apiKeys.openai_key),
      has_custom_gemini_key: Boolean(apiKeys.gemini_key),
      has_custom_deepseek_key: Boolean(apiKeys.deepseek_key),
      has_custom_groq_key: Boolean(apiKeys.groq_key)
    }, null, 2));
    return;
  }

  // 5. POST /api/auth/logout
  if (action === 'logout' && req.method === 'POST') {
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: `Auth endpoint not found: ${action}` }));
}

module.exports = { handleAuth, getAuthenticatedUser, extractBearerToken };
