/**
 * Creator Profile Route Handler
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const PROFILE_FILE = path.join(DATA_DIR, 'creator_profile.json');

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

function handleProfile(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET') {
    if (fs.existsSync(PROFILE_FILE)) {
      try {
        const content = fs.readFileSync(PROFILE_FILE, 'utf8');
        res.writeHead(200);
        res.end(content);
        return;
      } catch (e) {
        console.error('Error reading profile file:', e);
      }
    }
    res.writeHead(200);
    res.end(JSON.stringify(DEFAULT_PROFILE, null, 2));
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        parsed.updated_at = new Date().toISOString();
        fs.writeFileSync(PROFILE_FILE, JSON.stringify(parsed, null, 2), 'utf8');
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, message: 'Creator profile saved successfully', profile: parsed }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON body', details: err.message }));
      }
    });
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}

module.exports = { handleProfile };
