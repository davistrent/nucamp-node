const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST_NAME = 'localhost';
const PORT = 3000;

function responseTemplate(statusCode, message) {
    return `<html><body><h1>Error ${statusCode}: ${message}</h1></body></html>`
}

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);
    const CONTENT_TYPE_HEADER = 'Content-Type';
    const CONTENT_TYPE = 'text/html';

    if(req.method === 'GET') {
        const fileUrl = req.url === '/' ? '/index.html' : req.url;
        const filePath = path.resolve(`./public${fileUrl}`);
        const fileExt = path.extname(filePath);

        if(fileExt === '.html') {
            fs.exists(filePath, (exists) => {
                if(!exists) {
                    const statusCode = 404;
                    const message = `${fileUrl} not found`;
                    const response = responseTemplate(statusCode, message);

                    res.statusCode = statusCode;
                    res.setHeader(CONTENT_TYPE_HEADER, CONTENT_TYPE);
                    res.end(response);

                    return;
                } else {
                    res.statusCode = 200;
                    res.setHeader(CONTENT_TYPE_HEADER, CONTENT_TYPE);
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        } else {
            const statusCode = 415;
            const message = `${fileExt} is an unsupported media type`;
            const response = responseTemplate(statusCode, message);

            res.statusCode = statusCode;
            res.setHeader(CONTENT_TYPE_HEADER, CONTENT_TYPE_HEADER);
            res.end(response);
        }
    } else {
        const statusCode = 405;
        const message = `${req.method} not allowed`;
        const response = responseTemplate(statusCode, message);

        res.statusCode = statusCode;
        res.setHeader('Allow', 'GET');
        res.setHeader(CONTENT_TYPE_HEADER, CONTENT_TYPE);
        res.end(response);
    }
});

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});
