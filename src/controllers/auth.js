
const response = require('../helpers/standardResponse')
const authModel = require('../models/auth')

exports.login = (req, res) => {
    authModel.login(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.register = (req, res) => {
    authModel.register(req, (err, msg, results=null) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}