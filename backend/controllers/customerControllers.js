const buyer=require("../models/customerModel");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")

const createToken= (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET||"12345678",{
        expiresIn:3*60*60
    })
}

const register=async (req,res)=>{
    try {
        const {name,email,password,address}=req.body;

       const hashedpwd=await bcryptjs.hash(password,10);

        const details=new buyer({
            name,email,password:hashedpwd,address
        })

       const newBuyer= await details.save();

       let token= createToken(newBuyer._id);
       res.cookie('jwt',token,{
        maxAge:3*60*60*1000,credetials:true
       })

        

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
        let token=createToken(isemail._id);
        res.cookie("jwt",token,{
            maxAge:3*60*60*1000,credetials:true
        })
        
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