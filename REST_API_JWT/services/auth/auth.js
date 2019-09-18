const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator/check');
const config = require('../../configs/config/config');
const userModel = require('../../models/user');

const register = async(req,res,next) => {
    let errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            'errors':errors.array()
        });
    }

    let {name, email, password} = req.body;

    let isEmailExists = await userModel.findOne({"email" : email});

    if(isEmailExists)
    {
        return res.status(420).json({
            "errors":[
                {
                    "message"  : "Email already exists in system"
                }
            ]
        });
    }

    let hashedPassword = await bcrypt.hash(password,8);
    try {
        let user = await userModel.create({
            name:name,
            email: email,
            password: hashedPassword
        });

        if(!user)
        {
            throw new error(); 
        }
        
        return res.status(201).json({
            "success":[
                {
                    "message" : "User Registration successful"
                }
            ]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            'errors':[{
                "message": "Error occured while creating user in system"
            }]
        });
    }
}

const login = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            "errors":errors.array()
        });
    }

    let {email,password} =  req.body;

    try{
     let isUserExists = await userModel.findOne({"email":email});
     let isPasswordValid = await bcrypt.compare(password,isUserExists.password);
     if(!isUserExists || !isPasswordValid)
     {
        return res.status(401).json({
            "error":[{
                "message" : "Email/Password is wrong"
            }]
        });
     }

     let token = jwt.sign({id:isUserExists._id}, config.secret, {expiresIn:86400});
     return res.status(200).json({
        "success":[{
            "message" : "User logged in successfully",
            "email" : email,
            "token" : token
        }]
     });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            "errors":[{
                "message" : "There was a problem while login user"
            }]
        });
    }
}

module.exports ={
    register : register,
    login : login
}