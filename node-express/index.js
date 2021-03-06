const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

const HOST_NAME = 'localhost';
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));
app.use('/dishes', dishRouter);

app.get('/dishes/:dishId', (req, res, next) => {
    res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end(`${req.method} operation not supported on ${req.path}`);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write(`Updating the dish: ${req.params.dishId} \n`);
    res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}`);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end(`Deleting dish: ${req.params.dishId}`);
});

const server = http.createServer(app);

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at http://${HOST_NAME}:${PORT}`);
});
