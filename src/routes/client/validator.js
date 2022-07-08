const {body} = require('express-validator');
const bcrypt = require('bcrypt');

exports.validatorAuth = [
  body('username').isLength({min: 5})
    .withMessage('Username must be 5 characters')
    .isLength({max: 15}).withMessage('Username max 15 characters'),
  body('password').isLength({min: 5})
    .withMessage('Password must be 5 characters')
    .customSanitizer( async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
  body('email').isEmail().withMessage('Email format invalid')
];