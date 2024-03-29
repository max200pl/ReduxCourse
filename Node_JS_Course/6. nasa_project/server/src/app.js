const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express(); // express just listener function for a build in HTTP server

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan("combined"));

app.use(express.json()); // parse all incoming json from the body incoming request
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/v1', api);
// app.use('/v2', api);


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;