
const auth = require('express').Router()
const authControllers = require("../controllers/auth");

auth.post('/login', authControllers.login)
auth.post('/register', authControllers.register)

module.exports = auth;