const userRoute = require('express').Router();

const authMiddleware = require('../../middleware/auth');
const userController = require('../../controllers/client/userController');
const validatorRules = require('./validator');
const validationMiddleware = require('../../middleware/validation');

userRoute.patch('/changePassword', authMiddleware, 
  validatorRules.validatorPasswordConfirm, validationMiddleware, 
  userController.changePassword);

module.exports = userRoute;