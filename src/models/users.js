
const { prisma } = require("../../prisma/constants/config");
const bcrypt = require("bcrypt");

exports.getUsersData = async (req, cb) => {
    let users, usersAll;
    
    try {
        usersAll = await prisma.users.findMany()

        let limit = parseInt(req.query.limit)? parseInt(req.query.limit):10
        let page = parseInt(req.query.page)? parseInt(req.query.page):1 
        let search = req.query.search
        let filter = req.query.filter

        users = await prisma.users.findMany({
            skip: page == 1? 0: search? usersAll.length : ((page-1)*limit),
            take: search? usersAll.length:limit,
            where: {
                email: {
                    contains: search? search:'',
                },
            },
            orderBy: {
                id: req.query.filter? req.query.filter:'asc',
            },
        })
        
        if(!users){
            return cb('Users not found')
        }
        
        const pageInfo = {}

        pageInfo.totalData = search? users.length:usersAll.length
        pageInfo.totalPage = search? 1:Math.ceil(usersAll.length/limit)
        pageInfo.currentPage = page
        pageInfo.nextPage = search? null : page == Math.ceil(usersAll.length/limit)? null : (page+1)
        pageInfo.prevPage = page == 1? null : (page-1)

        users.map((e, index) => {
            users[index] = {
                id: e.id,
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

        return cb(null, 'All users data', users, pageInfo)
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