/**
 * Vercel Serverless Function: /api/trends
 */
const { handleTrends } = require('../server/routes/trends');

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const action = url.searchParams.get('action') || url.pathname.replace(/^\/api\/trends\/?/, '') || 'feed';
    return await handleTrends(req, res, action);
  } catch (err) {
    console.error('[API/Trends Error]:', err);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 500;
    res.end(JSON.stringify({
      error: 'Trends intelligence service failed',
      details: err.message
    }));
  }
};
