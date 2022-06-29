const users = require('express').Router();

const userController = require('../controllers/user');

users.get('/', userController.getAllUser);
users.get('/:id', userController.getUser);
users.post('/', userController.createUser);
users.patch('/:id', userController.updateUser);
users.delete('/:id', userController.hardDeleteUser);
users.delete('/delete/:id', userController.softDeleteUser);

module.exports = users;