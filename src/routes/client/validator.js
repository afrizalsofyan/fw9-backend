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

exports.validatorPin = [
  body('pin')
    .isLength({min: 6, max: 6}).withMessage('Pin must 6 character!!')
    .isNumeric().withMessage('Pin must be number')
];

exports.validatorLogin = [
  body('email').isEmail().withMessage('Format email invalid!!'),
  body('password').isLength({min: 5})
    .withMessage('Password must be 5 characters')
];

exports.validatorEmail = [
  body('email').isEmail().withMessage('Invalid email format')
];

exports.validatorForgetPassword = [
  body('newPassword').isLength({min: 5})
    .withMessage('Password must be 5 characters')
    .custom((val, {req})=>{
      if(val !== req.body.confirmPassword) {
        throw new Error('Password confirmation is incorrect');
      }
      return true;
    })
    .customSanitizer( async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
  body('confirmPassword').isLength({min: 5})
    .withMessage('Password must be 5 characters')
];

exports.validatorPasswordConfirm = [
  body('repeatPassword')
    .custom((val, {req}) => {
      if(val !== req.body.newPassword){
        throw new Error('Repeat password is incorrect!!!');
      }
      return true;
    }),
  body('newPassword').isLength({min: 5})
    .withMessage('Password mus be 5 characters')
    .customSanitizer( async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    })
];

exports.validatorPhone = [
  body('phoneNumber').isMobilePhone('id-ID').withMessage('Format phone is not support')
];