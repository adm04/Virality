/**
 * Vercel Serverless Function: /api/trends
 */
const { handleTrends } = require('../server/routes/trends');

module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = url.searchParams.get('action') || url.pathname.replace(/^\/api\/trends\/?/, '') || 'feed';
  return handleTrends(req, res, action);
};
