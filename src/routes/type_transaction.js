const types = require('express').Router();
const typeController = require('../controllers/type_transaction');

types.post('/', typeController.addNewType);

module.exports = types;