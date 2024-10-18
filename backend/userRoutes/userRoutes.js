const express = require('express');
const router=express.Router();
const {register,login}=require("../controllers/sellerContollers")


router.post('/register',register);

router.post("/login",login);

module.exports=router;