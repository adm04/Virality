/**
 * Vercel Serverless Function: /api/ai
 */
const { handleAI } = require('../server/routes/ai');

module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const action = url.searchParams.get('action') || url.pathname.replace(/^\/api\/ai\/?/, '') || 'generate-angles';
  return handleAI(req, res, action);
};
