/**
 * Creator Profile Route Handler
 * Vercel Serverless & Node.js Native Compatible
 */
const fs = require('fs');
const path = require('path');

const DEFAULT_PROFILE = {
  id: 'profile-arka-01',
  user_id: 'user-arka-01',
  name: 'Arka Mondal',
  email: 'arkadeb.mondal@example.com',
  content_types: ['reels', 'shorts', 'youtube'],
  niches: ['ai', 'technology'],
  age_range: '18-34',
  country: 'India',
  language: 'English',
  audience_description: 'Young tech professionals, developers, and creators interested in AI productivity tools.',
  goals: 'views',
  preferred_formats: ['trending', 'storytelling', 'case-studies', 'educational', 'controversial', 'tutorials'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  onboarding_completed: true
};

let inMemoryProfile = { ...DEFAULT_PROFILE };

function getProfileFile() {
  try {
    const localDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });
    return path.join(localDir, 'creator_profile.json');
  } catch (e) {
    // Read-only filesystem fallback (Vercel Serverless)
    try {
      const tmpDir = path.join('/tmp', 'vantage_data');
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
      return path.join(tmpDir, 'creator_profile.json');
    } catch (err) {
      return null;
    }
  }
}

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
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const file = getProfileFile();

  if (req.method === 'GET') {
    if (file && fs.existsSync(file)) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        res.writeHead(200);
        res.end(content);
        return;
      } catch (e) {
        console.warn('File read warning:', e.message);
      }
    }
    res.writeHead(200);
    res.end(JSON.stringify(inMemoryProfile, null, 2));
    return;
  }

  if (req.method === 'POST') {
    try {
      const parsed = await parseBody(req);
      parsed.updated_at = new Date().toISOString();
      inMemoryProfile = { ...inMemoryProfile, ...parsed };

      if (file) {
        try {
          fs.writeFileSync(file, JSON.stringify(inMemoryProfile, null, 2), 'utf8');
        } catch (e) {
          console.warn('File write warning (using memory):', e.message);
        }
      }

      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: 'Creator profile saved successfully', profile: inMemoryProfile }));
    } catch (err) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON body', details: err.message }));
    }
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}

module.exports = { handleProfile };
