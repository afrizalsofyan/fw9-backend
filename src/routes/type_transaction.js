const types = require('express').Router();
const typeController = require('../controllers/type_transaction');

types.post('/', typeController.addNewType);
types.get('/', typeController.getTypes);
types.get('/:id', typeController.getType);
types.patch('/:id', typeController.updateType);
types.delete('/:id', typeController.hardDeleteType);

module.exports = types;