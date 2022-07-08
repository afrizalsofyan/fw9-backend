const routerCLient = require('express').Router();

routerCLient.use('/auth', require('./auth'));

module.exports = routerCLient;