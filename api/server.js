const express = require('express');
const helmet = require('helmet');
const CORS = require('cors');
const session = require('express-session');
const restricted = require('../auth/restricted-middleware.js');



const usersRouter = require('../users/users-router');
const authRouter = require('../auth/router');


const server = express();
const sessionConfig = {
    name: "monster",
    secret: "know nothing",
    cookie: {
      maxAge: 1000 * 60 * 30,
      secure: false, //true in production to send only over https
      httpOnly: true, // true means no access from JS
    },
    resave: false,
    saveUninitialized: true, //GDPR laws require to check with client
  }

//teaching servers to use dependancies
server.use(helmet());
server.use(express.json());
server.use(CORS());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users',restricted, usersRouter);

server.get('/', (req, res) => {
    res.json({serverStatus: "🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️"});
})

module.exports = server;