const router = require('express').Router();

// router.use('/', (req, res)=>res.send("Hallo dari backend"))
router.use('/auth',require('./auth'));
router.use('/users',require('./users'));
router.use('/transactions',require('./transactions'));

module.exports=router