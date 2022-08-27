
const users = require('express').Router()
const usersControllers = require("../controllers/users");
const auth = require('../middleware/auth')
const uploadMiddleware = require("../middleware/upload")

users.get('/', auth, usersControllers.getUsersData)
users.get('/:id', auth, usersControllers.getUserDataById)
users.get('/check/pin', auth, usersControllers.getUserPin)
users.patch('/patch/name', auth, usersControllers.patchUserFullname)
users.patch('/patch/phone', auth, usersControllers.patchUserPhoneNumber)
users.patch('/patch/image', auth, uploadMiddleware, usersControllers.patchUserImage)
users.patch('/patch/pin', auth, usersControllers.patchUserPin)
users.patch('/patch/password', auth, usersControllers.patchUserPassword)

module.exports = users;