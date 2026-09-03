/**
 * Vercel Serverless Function: /api/score
 */

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
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    const data = await parseBody(req);
    const text = (data.hook || data.title || '').trim();

    if (!text) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Hook text is required' }));
      return;
    }

    const hasNumber = /\d+/.test(text);
    const hasQuestion = text.includes('?');
    const hasLossAversion = /delete|stop|never|worst|mistake|regret|fail|lies|disaster|broken/i.test(text);
    const hasPowerWord = /secret|tested|truth|insane|brutal|proof|architecture|scaled|formula/i.test(text);
    const len = text.length;

    let curiosity = 78 + (hasQuestion ? 8 : 0) + (hasPowerWord ? 8 : 0) + (len > 30 ? 4 : 0);
    let stakes = 75 + (hasLossAversion ? 14 : 0) + (hasNumber ? 6 : 0);
    let velocity = 80 + (len >= 45 && len <= 95 ? 12 : 4) + (hasNumber ? 5 : 0);

    curiosity = Math.min(99, curiosity);
    stakes = Math.min(99, stakes);
    velocity = Math.min(99, velocity);

    const overallScore = Math.round((curiosity * 0.35) + (stakes * 0.35) + (velocity * 0.30));

    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      hook: text,
      overall_score: overallScore,
      tier: overallScore >= 90 ? 'EXPLOSIVE' : (overallScore >= 75 ? 'STRONG' : 'CALIBRATED'),
      signals: {
        curiosity_gap: curiosity,
        stakes_conflict: stakes,
        algorithmic_velocity: velocity
      }
    }, null, 2));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Score service error', details: err.message }));
  }
};
