
const { prisma } = require("../../prisma/constants/config");
const upload = require('../middleware/upload')
const bcrypt = require("bcrypt");

exports.getUsersData = async (req, cb) => {
    let users;
    try {
        users = await prisma.users.findMany()
        if(!users){
            return cb('Users not found')
        }
        
        users.map((e, index) => {
            users[index] = {
                email: e.email,
                first_name: e.first_name,
                last_name: e.last_name,
                image: e.image,
                balance: e.balance,
                pin: e.pin,
                phone_number: e.phone_number,
                account_number: e.account_number,
            }
        })

        return cb(null, 'All users data', users)
    } catch (error) {
        return cb(error.message)
    }
}

exports.getUserDataById = async (req, cb) => {
    let user;
    try {
        user = await prisma.users.findUnique({
            where:{
                id: req.params.id !== ':id'? req.params.id:req.authResult.id
            }
        });
        
        if(!user){
            return cb('Users not found')
        }

        user = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            image: user.image,
            balance: user.balance,
            pin: user.pin,
            phone_number: user.phone_number,
            account_number: user.account_number,
        }

        return cb(null, 'User data', user)
    } catch (error) {
        return cb(error.message)
    }
}

exports.getUserPin = async (req, cb) => {
    let user;
    try {
        user = await prisma.users.findUnique({
            where:{
                id: req.authResult.id
            }
        });
        
        if(!user){
            return cb('Users not found')
        }

        const pin = user.pin
        return cb(null, 'User data', {pin})
    } catch (error) {
        return cb(error.message)
    }
}

exports.patchUserFullname = async (req, cb) => {
    let user;
    try {
        user = await prisma.users.update({
            where: {
              id: req.authResult.id
            },
            data: {
              first_name: req.body.first_name,
              last_name: req.body.last_name
            },
        })
        
        if(!user){
            return cb('Users not found')
        }

        return cb(null, 'Success update user data')
    } catch (error) {
        return cb(error.message)
    }
}

exports.patchUserPhoneNumber = async (req, cb) => {
    let user;
    try {
        user = await prisma.users.update({
            where: {
              id: req.authResult.id
            },
            data: {
              phone_number: req.body.phone_number
            },
        })
        
        if(!user){
            return cb('Users not found')
        }

        return cb(null, 'Success update user data')
    } catch (error) {
        return cb(error.message)
    }
}

exports.patchUserImage = async (req, cb) => {
    let user;
    try {
        const uploadImage = `${req.file.filename.split('/')[1]}.${req.file.mimetype.split('/')[1]}`
        user = await prisma.users.update({
            where: {
              id: req.authResult.id
            },
            data: {
              image: uploadImage
            },
        })
        
        if(!user){
            return cb('Users not found')
        }

        return cb(null, 'Success update user data')
    } catch (error) {
        return cb(error.message)
    }
}

exports.patchUserPin = async (req, cb) => {
    let user;
    try {
        user = await prisma.users.update({
            where: {
              id: req.authResult.id
            },
            data: {
              pin: req.body.pin
            },
        })
        
        if(!user){
            return cb('Users not found')
        }

        return cb(null, 'Success update user data')
    } catch (error) {
        return cb(error.message)
    }
}

exports.patchUserPassword = async (req, cb) => {
    let user;
    try {
        if(!req.body.password) return cb('Password cant empty')

        const salt = 10;
        let saltedPassword = await bcrypt.hash(req.body.password, salt);

        user = await prisma.users.update({
            where: {
              id: req.authResult.id
            },
            data: {
              password: saltedPassword
            },
        })
        
        if(!user){
            return cb('Users not found')
        }

        return cb(null, 'Success update user data')
    } catch (error) {
        return cb(error.message)
    }
}