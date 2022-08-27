const upload = require('../helpers/upload').single('image')
const response = require('../helpers/standardResponse')

const uploadFile = (req, res, next) => {
    upload(req, res, (err)=>{
        if ('image' in req.body) return response(res, 'Image cant empty', null, null, 400);
        if(err) return response(res, err.message, null, null, 400);
        next();
    })
}

module.exports = uploadFile