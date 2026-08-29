/**
 * Vantage Virality OS - Root Entry Point
 * Delegates to server/server.js
 */

const server = require('./server/server.js');
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`==========================================================`);
    console.log(`  VANTAGE VIRALITY OS V2 - NODE.JS BACKEND RUNNING        `);
    console.log(`  URL: http://localhost:${PORT}/                            `);
    console.log(`  API: http://localhost:${PORT}/api/health                  `);
    console.log(`  Press Ctrl+C to stop the server                         `);
    console.log(`==========================================================`);
  });
}

module.exports = server;
