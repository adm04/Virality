/**
 * Content Library Route Handler
 * Vercel Serverless & Node.js Native Compatible
 */
const fs = require('fs');
const path = require('path');

const DEFAULT_LIBRARY = [
  {
    id: 'lib-1',
    title: 'I gave 3 AI agents $1,000 each and let them trade for 30 days',
    hook: "I gave 3 AI agents $1,000 each and let them trade for 30 days — the results broke my model.",
    niche: 'ai',
    platform: 'youtube',
    score: 98,
    scoreTier: 'EXPLOSIVE',
    source: 'AI Autonomous Trading Agents',
    stage: 'filming',
    stageName: 'Filming',
    createdAt: '2026-08-27'
  },
  {
    id: 'lib-2',
    title: 'Rating client red flags before the discovery call ends',
    hook: "Rating client red flags before the discovery call even ends.",
    niche: 'business',
    platform: 'shorts',
    score: 93,
    scoreTier: 'EXPLOSIVE',
    source: 'Solopreneur Micro-SaaS Playbook',
    stage: 'scripted',
    stageName: 'Scripted',
    createdAt: '2026-08-26'
  },
  {
    id: 'lib-3',
    title: 'Delete these 3 VS Code extensions before your next build',
    hook: "Delete these 3 VS Code extensions before they secretly slow down your build times.",
    niche: 'technology',
    platform: 'shorts',
    score: 87,
    scoreTier: 'STRONG',
    source: 'VS Code Extensions Optimization',
    stage: 'idea',
    stageName: 'Ideas',
    createdAt: '2026-08-28'
  }
];

let inMemoryLibrary = [...DEFAULT_LIBRARY];

function getLibraryFile() {
  try {
    const localDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });
    return path.join(localDir, 'content_library.json');
  } catch (e) {
    // Read-only filesystem fallback (Vercel Serverless)
    try {
      const tmpDir = path.join('/tmp', 'vantage_data');
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
      return path.join(tmpDir, 'content_library.json');
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

function readLibrary() {
  const file = getLibraryFile();
  if (file && fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      inMemoryLibrary = JSON.parse(content);
      return inMemoryLibrary;
    } catch (e) {
      console.warn('Library read warning:', e.message);
    }
  }
  return inMemoryLibrary;
}

function writeLibrary(data) {
  inMemoryLibrary = data;
  const file = getLibraryFile();
  if (file) {
    try {
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.warn('Library write warning (using memory):', e.message);
    }
  }
}

async function handleLibrary(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET') {
    const items = readLibrary();
    res.writeHead(200);
    res.end(JSON.stringify(items, null, 2));
    return;
  }

  if (req.method === 'POST') {
    try {
      const payload = await parseBody(req);
      let items = readLibrary();

      if (Array.isArray(payload)) {
        items = payload;
      } else if (payload && payload.id) {
        const existingIdx = items.findIndex(i => i.id === payload.id);
        if (existingIdx >= 0) {
          items[existingIdx] = { ...items[existingIdx], ...payload };
        } else {
          items.unshift(payload);
        }
      }

      writeLibrary(items);
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: 'Library saved', count: items.length }));
    } catch (err) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON body', details: err.message }));
    }
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}

module.exports = { handleLibrary };
