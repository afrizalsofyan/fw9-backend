const transactions = require('express').Router();

const transactionController = require('../controllers/transaction');


transactions.post('/', ...transactionController.createTransaction);
transactions.get('/', transactionController.getAllTransaction);
transactions.get('/sort', transactionController.getTransactionByTime);
transactions.get('/:id', transactionController.getTransaction);
transactions.get('/find/:param', transactionController.findTransaction);
transactions.patch('/:id', ...transactionController.updateTransaction);
transactions.delete('/:id', transactionController.hardDeletedTransaction);

module.exports = transactions;