/**
 * Vercel Serverless Function: /api
 * Root API manifest & health probe
 */

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const payload = {
    service: 'Vantage Virality OS Backend API',
    version: '2.0.0',
    status: 'online',
    platform: 'vercel-serverless',
    timestamp: Math.floor(Date.now() / 1000),
    endpoints: [
      '/api/health',
      '/api/auth/me',
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/guest',
      '/api/profile',
      '/api/library',
      '/api/score',
      '/api/ai/generate-angles',
      '/api/ai/score-hook',
      '/api/ai/generate-script',
      '/api/trends/feed',
      '/api/trends/channel'
    ]
  };

  res.statusCode = 200;
  res.end(JSON.stringify(payload, null, 2));
};
