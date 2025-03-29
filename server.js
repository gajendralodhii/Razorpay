require('dotenv').config();
const http = require('http');
const app = require('./src/app')
const connect = require('./src/db/db');

connect();

/* 

server start
database connection

*/

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})