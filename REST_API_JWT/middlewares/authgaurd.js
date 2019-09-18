const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../configs/config/config');

const authClientToken = async(req,res,next)=>{
    let token = req.headers['x-access-token'];
    if(!token)
    {
        return res.status(401).json({
            'errors' : [{
                'message' : " No Authentication token provided in Header"
            }]
        });
    }

    jwt.verify(token,config.secret,(error,decode) => {
        if(error)
        {
            return res.status(401).json({
                'errors' : [{
                    'message' : "Invalid Token"
                }]
            });
        }
        return next();
    });

    
}

module.exports = {
    authClientToken : authClientToken
}