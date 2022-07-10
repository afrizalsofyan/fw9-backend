const profileRoute = require('express').Router();

const authMiddleware = require('../../middleware/auth');
const profileController = require('../../controllers/client/profileController');
const uploudMiddleware = require('../../middleware/uploudProfile');

profileRoute.get('/', authMiddleware, profileController.getProfile);
profileRoute.patch('/', authMiddleware, uploudMiddleware, profileController.updateProfile);

module.exports = profileRoute;