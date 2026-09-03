/**
 * Vercel Serverless Function: /api/ai
 */
const { handleAI } = require('../server/routes/ai');

module.exports = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const action = url.searchParams.get('action') || url.pathname.replace(/^\/api\/ai\/?/, '') || 'generate-angles';
    return await handleAI(req, res, action);
  } catch (err) {
    console.error('[API/AI Error]:', err);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 500;
    res.end(JSON.stringify({
      error: 'AI service execution failed',
      details: err.message
    }));
  }
};
