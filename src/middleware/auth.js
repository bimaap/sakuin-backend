
const response = require('../helpers/standardResponse')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    if(req.headers.authorization){
        const auth = req.headers.authorization.split(' ')
        const token = auth[1]
        
        try{
            const result = jwt.verify(token, process.env.JWT_KEY || 'S4KU1N_6969')
            req.authResult = result
            next()
        }catch(err){
            return response(res, err.message, null, false, 400);
        }
    }else{
        return response(res, 'Token not registered', null, false, 400);
    }
}

module.exports = auth