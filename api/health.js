/**
 * Vercel Serverless Function: /api/health
 */
module.exports = (req, res) => {
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

    const payload = {
      status: 'online',
      service: 'Vantage Virality Intelligence Backend',
      version: '2.0.0',
      server_time: new Date().toISOString(),
      timestamp: Math.floor(Date.now() / 1000),
      platform: 'vercel-serverless'
    };

    res.statusCode = 200;
    res.end(JSON.stringify(payload, null, 2));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ status: 'error', message: err.message }));
  }
};
