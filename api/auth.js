/**
 * Vercel Serverless Function: /api/auth
 */
const { handleAuth } = require('../server/routes/auth');

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const action = url.searchParams.get('action') || url.pathname.replace(/^\/api\/auth\/?/, '') || 'me';
    return await handleAuth(req, res, action);
  } catch (err) {
    console.error('[API/Auth Error]:', err);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 500;
    res.end(JSON.stringify({
      error: 'Authentication service failed',
      details: err.message
    }));
  }
};
