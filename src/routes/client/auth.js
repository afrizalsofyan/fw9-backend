const auth = require('express').Router();

const authController = require('../../controllers/client/auth');
const validation = require('../../middleware/validation');
const validatorRules = require('./validator');
// const authMiddleware = require('../../middleware/auth');

auth.post('/register', validatorRules.validatorAuth, validation, authController.register);
auth.post('/createPin', validatorRules.validatorPin, validation, authController.createPin);
auth.post('/login', validatorRules.validatorLogin, validation, authController.login);
auth.post('/forgetPasswordLink', validatorRules.validatorEmail, validation, authController.sendEmailForgetPassword);
auth.post('/forgetPassword', validatorRules.validatorForgetPassword, validation, authController.forgetPassword);

module.exports = auth;