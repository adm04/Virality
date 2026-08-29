let inMemoryLibrary = [
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
    return res.end(JSON.stringify(inMemoryLibrary));
  }

  if (req.method === 'POST') {
    const payload = await parseBody(req);
    if (Array.isArray(payload)) {
      inMemoryLibrary = payload;
    } else if (payload && payload.id) {
      const idx = inMemoryLibrary.findIndex(i => i.id === payload.id);
      if (idx >= 0) inMemoryLibrary[idx] = { ...inMemoryLibrary[idx], ...payload };
      else inMemoryLibrary.unshift(payload);
    }
    res.statusCode = 200;
    return res.end(JSON.stringify({ success: true, count: inMemoryLibrary.length }));
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
};
