const transactions = require('express').Router()

const transactionController = require('../controllers/transaction')

transactions.get('/', transactionController.getTransaction)

module.exports = transactions