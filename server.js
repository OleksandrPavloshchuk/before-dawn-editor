import http from 'http'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 3088;
const BASE_DIR = path.resolve(process.env.BASE_DIR || './dist');

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.htm':  'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.txt':  'text/plain; charset=utf-8',
};

const streamFile = (filePath, response) => {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME[ext] || 'application/octet';
    response.writeHead(200, {'Content-Type': mimeType});
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
        response.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end('500 Internal Server Error');
    });
    stream.pipe(response);
};

const httpServer = http.createServer((req, res) => {
    try {
        // decode and avoid malformed URIs
        const reqPath = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
        // map '/' to '/index.html' (optional)
        let rel = reqPath === '/' ? '/index.html' : reqPath;
        const safePath = path.normalize(rel).replace(/^(\.\.[\/\\])+/, ''); // simple cleanup
        const fullPath = path.join(BASE_DIR, safePath);

        // prevent directory traversal outside BASE_DIR
        if (!fullPath.startsWith(BASE_DIR)) {
            res.writeHead(403, {'Content-Type': 'text/plain; charset=utf-8'});
            return res.end('403 Forbidden');
        }

        fs.stat(fullPath, (err, stat) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
                return res.end('404 Not Found');
            }
            if (stat.isDirectory()) {
                // if directory, try index.html
                const idx = path.join(fullPath, 'index.html');
                return fs.stat(idx, (ie, istat) => {
                    if (!ie && istat.isFile()) {
                        streamFile(idx, res);
                    } else {
                        res.writeHead(403, {'Content-Type': 'text/plain; charset=utf-8'});
                        res.end('403 Directory listing not allowed');
                    }
                });
            }
            // file
            streamFile(fullPath, res);
        });
    } catch (e) {
        res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('400 Bad Request');
    }
});

// Entry point:
httpServer.listen(PORT, () => {
    console.log(`Serving files from: ${BASE_DIR}`);
    console.log(`HTTP server listening on http://0.0.0.0:${PORT}/`);
});