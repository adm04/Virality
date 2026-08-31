/**
 * Vercel Serverless Function: /api/library
 */

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
    res.end(JSON.stringify(inMemoryLibrary, null, 2));
    return;
  }

  if (req.method === 'POST') {
    try {
      const payload = await parseBody(req);
      if (Array.isArray(payload)) {
        inMemoryLibrary = payload;
      } else if (payload && payload.id) {
        const existingIdx = inMemoryLibrary.findIndex(i => i.id === payload.id);
        if (existingIdx >= 0) {
          inMemoryLibrary[existingIdx] = { ...inMemoryLibrary[existingIdx], ...payload };
        } else {
          inMemoryLibrary.unshift(payload);
        }
      }
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: 'Library saved', count: inMemoryLibrary.length }, null, 2));
    } catch (err) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON body', details: err.message }));
    }
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
};
