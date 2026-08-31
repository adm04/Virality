/**
 * Vercel Serverless Function: /api/profile
 */

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(inMemoryProfile, null, 2));
    return;
  }

  if (req.method === 'POST') {
    try {
      const data = await parseBody(req);
      data.updated_at = new Date().toISOString();
      inMemoryProfile = { ...inMemoryProfile, ...data };

      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        message: 'Creator profile saved successfully',
        profile: inMemoryProfile
      }, null, 2));
    } catch (err) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON body', details: err.message }));
    }
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
};
