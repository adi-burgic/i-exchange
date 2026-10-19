/* =========================================================
   Tiny local dev server (no dependencies, not used on Vercel).

   Serves the static site and routes /api/waitlist to the same
   function Vercel runs, so you can test everything locally.

   Run:  node --env-file=.env dev-server.js
   Open: http://localhost:3000
   ========================================================= */
const http = require('http');
const fs = require('fs');
const path = require('path');
const waitlist = require('./api/waitlist');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// Only these file types are served, so .env and other files stay private.
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer(function (req, res) {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  // API route: collect the JSON body, then hand over to the Vercel-style handler.
  if (pathname === '/api/waitlist') {
    let raw = '';
    req.on('data', function (chunk) {
      raw += chunk;
      if (raw.length > 10000) req.destroy(); // ignore oversized bodies
    });
    req.on('end', function () {
      try { req.body = raw ? JSON.parse(raw) : {}; } catch (e) { req.body = {}; }
      waitlist(req, res);
    });
    return;
  }

  // Static files
  const file = pathname === '/' ? '/index.html' : pathname;
  const fullPath = path.join(ROOT, file);
  const type = TYPES[path.extname(fullPath)];
  const blocked = !fullPath.startsWith(ROOT + path.sep) || file.startsWith('/api/') || file === '/dev-server.js' || !type;

  if (blocked) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }

  fs.readFile(fullPath, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
});

server.listen(PORT, function () {
  console.log('i-Exchange running at http://localhost:' + PORT);
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.warn('Warning: SUPABASE_URL / SUPABASE_SERVICE_KEY not set. Did you run with --env-file=.env?');
  }
});
