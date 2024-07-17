const express=require('express');
const { signUp, login } = require('../Controllers/Auth');
const router=express.Router();

router.post('/signup',signUp);
router.post('/login',login);

module.exports=router;