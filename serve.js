const http = require('http');
const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');
const localhost = 'http://localhost:5173/';
// const htmlDocSsrParse = require('../ssr/index.js').htmlDocSsrParse;

// Serve Site
const devServer = http.createServer(async (req, res) => {
    // Log the request
    // console.log('>>', req.url); 

    // Modify the URL based on the condition
    if (req.url.startsWith('/@')) {
        req.url = req.url.replace('@easedotjs/', '');
    } else {
        req.url = path.join('site', 'public', req.url);
    }

    // If the URL ends with a slash, append index.html
    if (req.url.endsWith('/')) {
      req.url = path.join(req.url, 'index.html');
    }

    // Determine the file path
    let [filePath, args] = path.join(__dirname, '..', req.url).split('?');
    filePath = path.resolve(filePath);
    // console.error('<<', filePath);

    // Read the file and respond
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('404 Not Found');
            } else {
                res.statusCode = 500;
                res.end('500 Internal Server Error');
            }
        } else {
            res.statusCode = 200;
            // Optionally, set the content-type header based on the file type
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.html': 'text/html',
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.gif': 'image/gif'
            };
            
            // if (req.url.endsWith('.html') && !req.headers?.['x-ease-fetch']) {
            //   console.error('SSR', filePath);
            //   htmlDocSsrParse(data.toString(), localhost).then((ssrData) => {
            //     res.setHeader('Content-Type', 'text/html');
            //     res.end(ssrData);
            //   });
            // } else {
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              res.end(data);
            // }
        }
    });
});


devServer.listen(5173, () => {
  console.log('Serving Dev (Clientside) on port 5173');
});
