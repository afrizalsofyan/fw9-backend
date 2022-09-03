const auth = require('express').Router();

const authController = require('../../controllers/server/auth');
const validation = require('../../middleware/validation');
const validatorRules = require('./validator');
const authMiddelware = require('../../middleware/auth');

auth.post('/register', validatorRules.validatorAuth, validation, authController.register);
auth.post('/createPin', validatorRules.validatorCreatePin, validation, authController.createPin);
auth.post('/login', validatorRules.validatorLogin, validation, authController.login);
auth.post('/forgetPasswordLink', validatorRules.validatorEmail, validation, authController.sendEmailForgetPassword);
auth.patch('/forgetPassword', validatorRules.validatorForgetPassword, validation, authController.forgetPassword);
auth.patch('/logout', authMiddelware, authController.logout);
// auth.post('/confrimEmail', authController.confirmEmail);

// auth.patch('/profile', authMiddleware, authController.upatePofile);
module.exports = auth;