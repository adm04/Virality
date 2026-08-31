/**
 * ============================================================================
 * VANTAGE VIRALITY OS — AI & LLM ROUTE DISPATCHER
 * ============================================================================
 */

const aiEngine = require('../ai-engine');
const db = require('../db');
const { getAuthenticatedUser } = require('./auth');

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

async function handleAI(req, res, subPath = '') {
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
  const action = subPath || url.pathname.replace(/^\/api\/ai\/?/, '') || 'generate-angles';

  const user = getAuthenticatedUser(req);
  const userId = user ? user.id : 'usr_arka_master';
  const customKeys = db.getApiKeys(userId);
  const profile = db.getProfile(userId);

  // 1. POST /api/ai/generate-angles
  if (action === 'generate-angles' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const topic = data.topic || 'AI & Tech Breakthroughs';
      const niche = data.niche || profile?.niches?.[0] || 'ai';
      const platform = data.platform || 'Shorts & Reels';
      const passedProfile = data.profile || profile;

      const result = await aiEngine.generate12Angles(topic, niche, platform, passedProfile, customKeys);
      res.statusCode = 200;
      res.end(JSON.stringify(result, null, 2));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'AI generation failed', details: err.message }));
    }
    return;
  }

  // 2. POST /api/ai/score-hook
  if (action === 'score-hook' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const hookText = (data.hook || data.title || '').trim();
      const platform = data.platform || 'shorts';
      const niche = data.niche || profile?.niches?.[0] || 'ai';

      if (!hookText) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Hook headline text is required.' }));
        return;
      }

      const scoreResult = await aiEngine.generateHookScoreAndRewrites(hookText, platform, niche, customKeys);
      db.addScorerHistory({
        user_id: userId,
        hook: hookText,
        score: scoreResult.overall_score,
        tier: scoreResult.tier,
        platform,
        niche
      });

      res.statusCode = 200;
      res.end(JSON.stringify(scoreResult, null, 2));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Virality scoring failed', details: err.message }));
    }
    return;
  }

  // 3. POST /api/ai/generate-script
  if (action === 'generate-script' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const title = data.title || 'How to Build an AI Micro-SaaS';
      const hook = data.hook || title;
      const platform = data.platform || 'Shorts / Reels';
      const niche = data.niche || 'tech';

      const scriptResult = await aiEngine.generateVideoScript(title, hook, platform, niche, customKeys);
      res.statusCode = 200;
      res.end(JSON.stringify(scriptResult, null, 2));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Script generation failed', details: err.message }));
    }
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: `AI endpoint not found: ${action}` }));
}

module.exports = { handleAI };
