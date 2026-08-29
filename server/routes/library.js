/**
 * Content Library Route Handler
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const LIBRARY_FILE = path.join(DATA_DIR, 'content_library.json');

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

function readLibrary() {
  if (fs.existsSync(LIBRARY_FILE)) {
    try {
      const content = fs.readFileSync(LIBRARY_FILE, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Error parsing library file:', e);
    }
  }
  return [...DEFAULT_LIBRARY];
}

function writeLibrary(data) {
  fs.writeFileSync(LIBRARY_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function handleLibrary(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'GET') {
    const items = readLibrary();
    res.writeHead(200);
    res.end(JSON.stringify(items, null, 2));
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        let items = readLibrary();

        if (Array.isArray(payload)) {
          // Bulk replacement
          items = payload;
        } else if (payload && payload.id) {
          // Single item add / upsert
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
    });
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
}

module.exports = { handleLibrary };
