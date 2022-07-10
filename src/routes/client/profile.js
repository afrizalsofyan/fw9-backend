const profileRoute = require('express').Router();

const authMiddleware = require('../../middleware/auth');
const profileController = require('../../controllers/client/profileController');
const uploudMiddleware = require('../../middleware/uploudProfile');
const validatorRules = require('./validator');
const validation = require('../../middleware/validation');

profileRoute.get('/', authMiddleware, profileController.getProfile);
profileRoute.patch('/', authMiddleware, uploudMiddleware, profileController.updateProfile);
profileRoute.post('/phone', authMiddleware, validatorRules.validatorPhone, validation, profileController.addPhoneNumber);
profileRoute.patch('/phone', authMiddleware, validatorRules.validatorPhone, validation, profileController.updatePhoneNumber);

module.exports = profileRoute;