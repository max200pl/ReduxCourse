const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 8000;

const sever = http.createServer(app);

sever.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
})

