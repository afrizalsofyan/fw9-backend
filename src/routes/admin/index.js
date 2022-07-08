const routerAdmin = require('express').Router();

routerAdmin.use('/users', require('./user'));
routerAdmin.use('/transactions', require('./transaction'));
routerAdmin.use('/userDetail', require('./profile'));
routerAdmin.use('/type/transactions', require('./type_transaction'));

module.exports = routerAdmin;