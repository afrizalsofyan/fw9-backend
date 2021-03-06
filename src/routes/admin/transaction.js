const transactions = require('express').Router();

const transactionController = require('../../controllers/transaction');


transactions.post('/', ...transactionController.createTransaction);
transactions.get('/', transactionController.getAllTransaction);
transactions.get('/:id', transactionController.getTransaction);
transactions.patch('/:id', ...transactionController.updateTransaction);
transactions.delete('/delete/:id', transactionController.softDelate);
transactions.delete('/:id', transactionController.hardDeletedTransaction);


module.exports = transactions;