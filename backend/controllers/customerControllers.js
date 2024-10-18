const mongoose = require('mongoose');
const buyer=require("../models/customerModel");
const bcryptjs = require('bcryptjs');

const register=async (req,res)=>{
    try {
        const {name,email,password,address}=req.body;

       const hashedpwd=await bcryptjs.hash(password,10);

        const details=new buyer({
            name,email,password:hashedpwd,address
        })

        await details.save();

        res.status(200).send({
            message:"customer added succesfully",

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal server error",
            error
        })
    }
}

const login= async (req,res)=>{
    try {
        const{email,password}=req.body;

    const isemail= await buyer.findOne({email});

    if(!isemail){
        res.status(404).send({message:"Email not found!"})
    }

    if(isemail && await bcryptjs.compare(password,isemail.password)){
        res.status(200).send({message:"login successful"});
    }else{
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal server error",
            error
        }) 
    }

}


module.exports={
 register,login
}