const auth = require('express').Router();

const authController = require('../../controllers/server/auth');
const validation = require('../../middleware/validation');
const validatorRules = require('./validator');

auth.post('/register', validatorRules.validatorAuth, validation, authController.register);
auth.post('/createPin', validatorRules.validatorPin, validation, authController.createPin);
auth.post('/login', validatorRules.validatorLogin, validation, authController.login);
auth.post('/forgetPasswordLink', validatorRules.validatorEmail, validation, authController.sendEmailForgetPassword);
auth.patch('/forgetPassword', validatorRules.validatorForgetPassword, validation, authController.forgetPassword);
// auth.post('/confrimEmail', authController.confirmEmail);

// auth.patch('/profile', authMiddleware, authController.upatePofile);
module.exports = auth;