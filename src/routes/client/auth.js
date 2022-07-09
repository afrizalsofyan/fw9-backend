const auth = require('express').Router();

const authController = require('../../controllers/client/auth');
const validation = require('../../middleware/validation');
const validatorRules = require('./validator');

auth.post('/register', validatorRules.validatorAuth, validation, authController.register);
auth.post('/createPin', validatorRules.validatorPin, validation, authController.createPin);
auth.post('/login', authController.login);

module.exports = auth;