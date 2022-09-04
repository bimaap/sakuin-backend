
const transactions = require('express').Router()
const transactionsControllers = require("../controllers/transactions");
const auth = require('../middleware/auth')

transactions.get('/', auth, transactionsControllers.getTransactions)
transactions.post('/transfer/:id', auth, transactionsControllers.postTransfer)
transactions.post('/topup', auth, transactionsControllers.postTopup)

module.exports = transactions;