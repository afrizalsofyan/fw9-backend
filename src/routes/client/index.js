const routerCLient = require('express').Router();

routerCLient.use('/auth', require('./auth'));
routerCLient.use('/profile', require('./profile'));
routerCLient.use('/user', require('./user'));

module.exports = routerCLient;