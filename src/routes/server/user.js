const userRoute = require('express').Router();

const authMiddleware = require('../../middleware/auth');
const userController = require('../../controllers/server/userController');
const validatorRules = require('./validator');
const validationMiddleware = require('../../middleware/validation');

userRoute.patch('/changePassword', authMiddleware, 
  validatorRules.validatorPasswordConfirm, validationMiddleware, 
  userController.changePassword);
userRoute.get('/changePin', authMiddleware, userController.getPin);
userRoute.patch('/changePin', authMiddleware, userController.changePin);

module.exports = userRoute;