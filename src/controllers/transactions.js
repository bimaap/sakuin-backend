const response = require('../helpers/standardResponse')
const transactionsModel = require('../models/transactions')

exports.getTransactions = (req, res) => {
    transactionsModel.getTransactions(req, (err, msg, results, pageInfo) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results, pageInfo);
    })
}

exports.getTransactionById = (req, res) => {
    transactionsModel.getTransactionById(req, (err, msg, results, pageInfo) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results, pageInfo);
    })
}

exports.postTransfer = (req, res) => {
    transactionsModel.postTransfer(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.postTopup = (req, res) => {
    transactionsModel.postTopup(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}