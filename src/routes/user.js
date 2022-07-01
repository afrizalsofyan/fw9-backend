const users = require('express').Router();

const userController = require('../controllers/user');

const {body} = require('express-validator');

const createValidator = [
  body('username').isLength({min: 5}).withMessage('username very short, please add 5 character or more!!'),
  body('email').isEmail().withMessage('invalid email format')
];

users.get('/', userController.getAllUser);
users.get('/:id', userController.getUser);
users.post('/', ...createValidator ,userController.createUser);
users.patch('/:id', ...createValidator ,userController.updateUser);
users.delete('/:id', userController.hardDeleteUser);
users.delete('/delete/:id', userController.softDeleteUser);

module.exports = users;