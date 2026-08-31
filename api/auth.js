/**
 * Vercel Serverless Function: /api/auth
 */
const { handleAuth } = require('../server/routes/auth');

module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = url.searchParams.get('action') || url.pathname.replace(/^\/api\/auth\/?/, '') || 'me';
  return handleAuth(req, res, action);
};
