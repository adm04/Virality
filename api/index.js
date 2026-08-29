/**
 * VANTAGE VIRALITY OS V2 — VERCEL SERVERLESS FUNCTION API
 * 100% Standalone, Zero-Dependency, Serverless & Edge-Ready
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

let inMemoryProfile = { ...DEFAULT_PROFILE };
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

function sendJson(res, statusCode, data) {
  const jsonStr = JSON.stringify(data, null, 2);
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(jsonStr);
}

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(204).end();
    res.writeHead(204);
    return res.end();
  }

  try {
    const rawUrl = req.url || '';
    let pathname = rawUrl;
    try {
      const parsedUrl = new URL(rawUrl, `http://${req.headers.host || 'localhost'}`);
      pathname = parsedUrl.pathname;
    } catch (e) {
      pathname = rawUrl.split('?')[0];
    }

    // 1. Health Endpoint
    if (pathname.includes('health') || pathname === '/' || pathname === '/api' || pathname === '/api/') {
      return sendJson(res, 200, {
        status: 'online',
        service: 'Vantage Virality Intelligence Backend (Vercel Serverless)',
        version: '2.0.0',
        server_time: new Date().toISOString(),
        timestamp: Math.floor(Date.now() / 1000)
      });
    }

    // 2. Profile Endpoint
    if (pathname.includes('profile')) {
      if (req.method === 'GET') {
        return sendJson(res, 200, inMemoryProfile);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        inMemoryProfile = { ...inMemoryProfile, ...body, updated_at: new Date().toISOString() };
        return sendJson(res, 200, { success: true, message: 'Creator profile saved', profile: inMemoryProfile });
      }
    }

    // 3. Library Endpoint
    if (pathname.includes('library')) {
      if (req.method === 'GET') {
        return sendJson(res, 200, inMemoryLibrary);
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
        return sendJson(res, 200, { success: true, message: 'Library saved', count: inMemoryLibrary.length });
      }
    }

    // 4. Score Endpoint
    if (pathname.includes('score')) {
      if (req.method === 'POST') {
        const data = await parseBody(req);
        const text = (data.hook || data.title || '').trim();
        if (!text) return sendJson(res, 400, { error: 'Hook text is required' });

        const hasNumber = /\d+/.test(text);
        const hasQuestion = text.includes('?');
        const hasLossAversion = /delete|stop|never|worst|mistake|regret|fail|lies|disaster|broken/i.test(text);
        const hasPowerWord = /secret|tested|truth|insane|brutal|proof|architecture|scaled|formula/i.test(text);
        const len = text.length;

        let curiosity = Math.min(99, 78 + (hasQuestion ? 8 : 0) + (hasPowerWord ? 8 : 0) + (len > 30 ? 4 : 0));
        let stakes = Math.min(99, 75 + (hasLossAversion ? 14 : 0) + (hasNumber ? 6 : 0));
        let velocity = Math.min(99, 80 + (len >= 45 && len <= 95 ? 12 : 4) + (hasNumber ? 5 : 0));
        const overallScore = Math.round((curiosity * 0.35) + (stakes * 0.35) + (velocity * 0.30));

        return sendJson(res, 200, {
          success: true,
          hook: text,
          overall_score: overallScore,
          tier: overallScore >= 90 ? 'EXPLOSIVE' : (overallScore >= 75 ? 'STRONG' : 'CALIBRATED'),
          signals: {
            curiosity_gap: curiosity,
            stakes_conflict: stakes,
            algorithmic_velocity: velocity
          }
        });
      }
    }

    return sendJson(res, 404, { error: 'Endpoint not found', path: pathname });
  } catch (err) {
    console.error('Serverless Error:', err);
    return sendJson(res, 500, { error: 'Internal Server Error', message: err.message });
  }
};
