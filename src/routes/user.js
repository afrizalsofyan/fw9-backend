const users = require('express').Router();

const userController = require('../controllers/user');

const {body} = require('express-validator');
const bcrypt = require('bcrypt');

const createValidator = [
  body('username').isLength({min: 5}).escape().withMessage('username very short, please add 5 character or more!!'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email format'),
  body('password').isLength({min: 6}).withMessage('Password min 6 character')
    .customSanitizer(async (val)=>{
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
  body('pin').isNumeric().withMessage('Invalid format, please input with number')
];

users.get('/', userController.getAllUser);
// users.get('/find', userController.findUser);
users.get('/:id', userController.getUser);
// users.get('/sort/user', userController.sortUser);
users.post('/', ...createValidator ,userController.createUser);
users.patch('/:id', ...createValidator ,userController.updateUser);
users.delete('/:id', userController.hardDeleteUser);
users.delete('/delete/:id', userController.softDeleteUser);

module.exports = users;