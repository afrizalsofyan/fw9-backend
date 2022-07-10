const transactionRoute = require('express').Router();
const transactionController = require('../../controllers/client/transactionController');
const authMiddleware = require('../../middleware/auth');

transactionRoute.get('/historyTransaction',authMiddleware, transactionController.historyTransaction);
transactionRoute.post('/transfer', authMiddleware, transactionController.createTransaction);

module.exports = transactionRoute;