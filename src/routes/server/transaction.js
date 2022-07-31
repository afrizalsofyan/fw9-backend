const transactionRoute = require('express').Router();
const transactionController = require('../../controllers/server/transactionController');
const authMiddleware = require('../../middleware/auth');

transactionRoute.get('/historyTransaction',authMiddleware, transactionController.historyTransaction);
transactionRoute.get('/getAllTransaction', authMiddleware, transactionController.getAllTransactions);
transactionRoute.post('/transfer', authMiddleware, transactionController.transfer);
transactionRoute.patch('/topup', authMiddleware, transactionController.topUpBalance);

module.exports = transactionRoute;