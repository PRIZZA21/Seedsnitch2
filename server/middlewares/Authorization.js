const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User_Model = require("../models/User_Model");


exports.protect =  expressAsyncHandler(async(req,res,next) => { 

    if(req.headers.authorization){

        try {
            const token    = req.headers.authorization.split(" ")[1];
            const decoded  = jwt.verify(token, process.env.jwtPrivateKey);
            const t        = await User_Model.findById(decoded._id).select('-password');
            req.user = t;
            next()
        } 
        
        catch (error) {
            console.log(error)
            res.status(400).json({error:'You are Not Authorized to access this page'})
        }

    }
    
    else{
       
        res.status(400).json({error:'You are Not Authorized to access this page'})
    }
})