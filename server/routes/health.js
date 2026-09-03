/**
 * Health & Telemetry Route Handler
 */

function handleHealth(req, res) {
  const payload = {
    status: 'online',
    service: 'Vantage Virality Intelligence Backend',
    version: '2.0.0',
    server_time: new Date().toISOString(),
    timestamp: Math.floor(Date.now() / 1000),
    platform: process.platform,
    uptime_seconds: Math.floor(typeof process.uptime === 'function' ? process.uptime() : 0)
  };

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload, null, 2));
}

module.exports = { handleHealth };
