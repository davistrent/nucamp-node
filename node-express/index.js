const express = require('express');
const http = require('http');
const morgan = require('morgan');

const HOST_NAME = 'localhost';
const PORT = 3000;

const app = express();

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});
