const routerCLient = require('express').Router();

routerCLient.use('/auth', require('./auth'));
routerCLient.use('/profile', require('./profile'));
routerCLient.use('/user', require('./user'));
routerCLient.use('/transactions', require('./transaction'));
routerCLient.use('/notification', require('./notification'));

module.exports = routerCLient;