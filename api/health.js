/**
 * Vercel Serverless Function: /api/health
 */
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const payload = {
    status: 'online',
    service: 'Vantage Virality Intelligence Backend',
    version: '2.0.0',
    server_time: new Date().toISOString(),
    timestamp: Math.floor(Date.now() / 1000),
    platform: 'vercel-serverless',
    uptime_seconds: Math.floor(process.uptime ? process.uptime() : 0)
  };

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
};
