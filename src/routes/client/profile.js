const profileRoute = require('express').Router();

const authMiddleware = require('../../middleware/auth');
const profileConstroller = require('../../controllers/client/profileClient');
const uploudMiddleware = require('../../middleware/uploudProfile');

profileRoute.get('/', authMiddleware, profileConstroller.getProfile);
profileRoute.patch('/', authMiddleware, uploudMiddleware, profileConstroller.updateProfile);
profileRoute.patch('/changePassword', authMiddleware, profileConstroller.changePassword);

module.exports = profileRoute;