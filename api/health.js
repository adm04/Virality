module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  res.statusCode = 200;
  res.end(JSON.stringify({
    status: 'online',
    service: 'Vantage Virality OS (Vercel Serverless)',
    version: '2.0.0',
    timestamp: Math.floor(Date.now() / 1000)
  }));
};
