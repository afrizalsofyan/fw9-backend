const routerCLient = require('express').Router();

routerCLient.use('/auth', require('./auth'));
routerCLient.use('/profile', require('./profile'));

module.exports = routerCLient;