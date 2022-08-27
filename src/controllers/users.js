
const response = require('../helpers/standardResponse')
const usersModel = require('../models/users')

exports.getUsersData = (req, res) => {
    usersModel.getUsersData(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.getUserDataById = (req, res) => {
    usersModel.getUserDataById(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.getUserPin = (req, res) => {
    usersModel.getUserPin(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.patchUserFullname = (req, res) => {
    usersModel.patchUserFullname(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.patchUserPhoneNumber = (req, res) => {
    usersModel.patchUserPhoneNumber(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.patchUserImage = (req, res) => {
    usersModel.patchUserImage(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.patchUserPin = (req, res) => {
    usersModel.patchUserPin(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}

exports.patchUserPassword = (req, res) => {
    usersModel.patchUserPassword(req, (err, msg, results) => {
        if(err) return response(res, err, null, null, 400);
        
        return response(res, msg, results);
    })
}