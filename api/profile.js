let inMemoryProfile = {
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

function parseBody(req) {
  return new Promise((resolve) => {
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === 'object') return resolve(req.body);
      try { return resolve(JSON.parse(req.body)); } catch (e) { return resolve({}); }
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch (e) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method === 'GET') {
    res.statusCode = 200;
    return res.end(JSON.stringify(inMemoryProfile));
  }

  if (req.method === 'POST') {
    const data = await parseBody(req);
    inMemoryProfile = { ...inMemoryProfile, ...data, updated_at: new Date().toISOString() };
    res.statusCode = 200;
    return res.end(JSON.stringify({ success: true, profile: inMemoryProfile }));
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
};
