
const { prisma } = require("../../prisma/constants/config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.login = async (req, cb) => {
    let user;
    const { email, password} = req.body;

    try {
        user = await prisma.users.findUnique({
            where:{
                email: email
            }
        });
        if(!user){
            return cb('Email is not registered')
        }
    } catch (error) {
        return cb(error.message)
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(isPasswordCorrect){
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY || 'S4KU1N_6969');
        return cb(null, 'Login Successfully', {token})
    }else{
        return cb('Password not correct')
    }
}

exports.register = async (req, cb) => {
    const { email, password } = req.body;

    if(!email) return cb('Email cant empty')

    let emailCheck;
    try {
        emailCheck = await prisma.users.findUnique({
            where:{
                email: email
            }
        });
    } catch (error) {
        return cb(error.message)
    }

    if(!emailCheck){
        const code = [
            0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e',
            'f','g','h','i','j','k','l','m','n','o',
            'p','q','r','s','t','u','v','w','x','y','z'
        ]
        let generateId = '';  
        let idCheck = true;
        
        while(idCheck){
            generateId = '';
            for(let i = 1; i <= 40; i++){
                generateId += code[Math.floor(Math.random()*36)];
            }

            try {
                idCheck = await prisma.users.findUnique({
                    where:{
                        id: generateId
                    }
                });
            } catch (error) {
                idCheck = false
                return cb(error.message)
            }
        }

        let accountNumberCheck = true;
        let generateAccountNumber = ''
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        while(accountNumberCheck){
            generateAccountNumber = '';
            for(let i = 1; i <= 4; i++){
                generateAccountNumber += numbers[Math.floor(Math.random()*10)];
            }

            try {
                accountNumberCheck = await prisma.users.findUnique({
                    where:{
                        account_number: generateAccountNumber
                    }
                });
            } catch (error) {
                accountNumberCheck = false
                return cb(error.message)
            }
        }


        if(!password) return cb('Password cant empty')

        const salt = 10;
        let saltedPassword = await bcrypt.hash(password, salt);
        
        try {  
            await prisma.users.create({
                data: {
                    id: generateId,
                    email: email,
                    password: saltedPassword,
                    account_number: generateAccountNumber
                }
            });
            return cb(null, 'Register Successfully')
        } catch (error) {
            return cb(error.message)
        }
    }else{
        return cb('Email already used')
    }
}