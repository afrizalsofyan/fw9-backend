const userRoute = require('express').Router();

const authMiddleware = require('../../middleware/auth');
const userController = require('../../controllers/server/userController');
const validatorRules = require('./validator');
const validationMiddleware = require('../../middleware/validation');


userRoute.patch('/changePassword', authMiddleware, 
  validatorRules.validatorPasswordConfirm, validationMiddleware, 
  userController.changePassword);
userRoute.get('/currentUser', authMiddleware, userController.getCurrentUser);
userRoute.get('/changePin', authMiddleware, userController.getPin);
userRoute.get('/allUser', authMiddleware, userController.allUser);
userRoute.patch('/changePin', authMiddleware, validatorRules.validatorPin, validationMiddleware, userController.changePin);
module.exports = userRoute;