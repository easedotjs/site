const http = require('http');
const path = require('path');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

const serve = serveStatic('../', { 'index': ['index.html', 'index.htm'] });

// CORS
const addCorsHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  next();
};

// Serve Site
const serverB = http.createServer((req, res) => {
  addCorsHeaders(req, res, () => {
    if (req.url.startsWith('/@')) {
      req.url =  req.url.replace('@easedotjs/','');
    } else {
      req.url = path.join('site', 'public', req.url);
    }
    serve(req, res, finalhandler(req, res));
  });
});

serverB.listen(5173, () => {
  console.log('Serving folder b on port 5173');
});
