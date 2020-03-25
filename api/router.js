const express = require('express');
const helmet = require('helmet');
const CORS = require('cors');
const session = require('express-session');


const usersRouter = require('../users/users-router');

const server = express();

//teaching servers to use dependancies
server.use(helmet());
server.use(express.json());
server.use(CORS());

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.json({serverStatus: 🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️});
})

module.exports = server;