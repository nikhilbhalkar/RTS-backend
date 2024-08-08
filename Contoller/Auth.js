const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken")


//Signup Controller

exports.signup = async(req,res)=>{
    try 
    {
        const {email,password} = req.body
        const existinguser = await User.findOne({email});
        
        if(existinguser){
            return res.status(400).json({
                success :false,
                message:"User already exist"
            });
        }
        let hsshedpassword;
        try
         {
            hsshedpassword = await bcrypt.hash(password,10);
            
        } catch (error)
         {
            return res.status(500).json({
                success :false,
                message:"Error in hashing pasword"
            })  ;
        }
        const user = await User.create({email,password:hsshedpassword});

        return res.status(200).json({
            success :true,
            message:"User created successfully"
        })
    } catch (error)
     {
         console.log("error while user creation");
         console.error(error)  
    }
};



//Login Controller

exports.login = async (req ,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill the all details.."
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not found"
            });
        }
        const payload = {
            email : user.email,
            id : user._id,
            role:user.role
        };

        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"}
            );

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            res.cookie('token', token, {
                httpOnly: true,
                //secure: false // Use HTTPS in production
                maxAge: 1000 * 60 * 60, // 1 hour
                sameSite: 'Lax'
              });

           

            res.status(200).json({
                success : true,
                token,
                user,
                message:"User loged in successfully"
            });
        }else{
               return res.status(403).json({
                success:false,
                message:"password does not match"
               }) ;
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Login false"
        });
    }
};