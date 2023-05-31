// Using Joi library for validating User Schema
const Joi    = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

// Impritng the mailers
const { register_mailer } = require("../mailers/Register_Mailer");

// Imprting utilities
const generateToken = require('../utilities/TokenGeneration.js');

// Library for async requests
const asyncHandler=require('express-async-handler')

// User Model
const User_Model = require("../models/User_Model");




// Function to validate user body for register 

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required().error(errors => {
            errors.forEach(err => {
              switch (err.code) {
                case "any.empty":
                  err.message = "Name cannot be empty!";
                  break;
                case "string.min":
                  err.message = `Name should have at least ${err.local.limit} characters!`;
                  break;
                case "string.max":
                  err.message = `Name should have at most ${err.local.limit} characters!`;
                  break;
                default:
                  break;
              }
            });
            return errors;
        }),
        email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com","net","in"] },
        })
        .required(),
        password: joiPassword
            .string()
            .min(6)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'string.min':'Password should contain at least 6 characters',
                'password.minOfUppercase': 'Password should contain at least 1 uppercase character',
                'password.minOfLowercase': 'Password should contain at least 1 lowercase character',
                'password.minOfSpecialCharacters':'Password should contain at least 1 special character',
                'password.minOfNumeric': 'Password should contain at least 1 numeric character',
                'password.noWhiteSpaces': 'Password should not contain white spaces',
          }),
    });

    return schema.validate(user);
}



// Function to validate user body for signin 

function validates(user) {
    const schema = Joi.object({
      email   : Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}


function updateValidation(check) {
    const schema = Joi.object({
        password: joiPassword
            .string()
            .min(6)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'string.min':'Password should contain at least 6 characters',
                'password.minOfUppercase': 'Password should contain at least 1 uppercase character',
                'password.minOfLowercase': 'Password should contain at least 1 lowercase character',
                'password.minOfSpecialCharacters':'Password should contain at least 1 special character',
                'password.minOfNumeric': 'Password should contain at least 1 numeric character',
                'password.noWhiteSpaces': 'Password should not contain white spaces',
          }),

    });

    return schema.validate(check);
}


  




/* 
    @description This route adds new user to database by req.body
    @method Post
    @route /api/users/signup
*/


exports.registerUser = asyncHandler(async(req,res) => {

    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({error:error.details[0].message});
    
        const {name,email,password} = req.body
        
    
        const UserExists = await    User_Model.findOne({email:email})
        if(UserExists) res.status(400).json({error: "User Already Registered. Please Login"});
       
        
        const user = await User_Model.create( {name,email,password});
        
        if(user)
        {
            register_mailer(user);
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isIncubator: user.isIncubator,
                isAmbassador: user.isAmbassador,
                profile_pic:user.profile_pic,
                token: generateToken(user)
            })
        }
    
        else{
            res.status(400).json({error:"Error in creating user"});
        }
    } catch (error) {
        console.log(error);
    }
})



/* 
    @description This route adds authenticates a newly logged in user
    @method Post
    @route /api/users/signin
*/


exports.authenticateUser = asyncHandler(async(req,res) => {
    
    try {
        const { error } = validates(req.body);
        if (error) return res.status(400).json({error:error.details[0].message});
        
        if (req.user) return res.status(400).json({error: "User already logged in!"});
    
        const user = await User_Model.findOne({email:req.body.email})
        if (!user) return res.status(400).json({error: "Invalid email or password"});
    
        const b = await user.authenticate(req.body.password)
        if (!b) return res.status(400).json({error: "Invalid email or password"});
    
        if( user && b){
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isIncubator: user.isIncubator,
                isAmbassador: user.isAmbassador,
                token: generateToken(user._id),
                profile_pic : user.profile_pic
            })
        }
    
        else{
            return res.status(400).json({error:"Invalid email or password"})
        }
    } catch (error) {
        console.log(error);
    }
   
})





/* 
    @description This route gives the profile info for logged in user
    @method Get
    @route /api/users/profile
*/


exports.getUserProfile = asyncHandler(async(req,res) => {
    const user = await User_Model.findById(req.user._id)

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isAmbassador: user.isAmbassador,
            isIncubator:user.isIncubator,
            applications: user.applications,
            profile_pic: user.profile_pic

        })
    }

    else{
        res.status(400).json({error:"User Not Found"})
    }
})




/* 
    @description This route updates the profile info for logged in user
    @method Put
    @route /api/users/profile
*/


exports.updateUserProfile = asyncHandler(async(req,res) => {
  
    const user = await User_Model.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email= req.body.email || user.email

        if(req.body.password){
            const check ={}
            check.password= req.body.password
            const { error } = updateValidation(check);
            if (error) return res.status(400).json({error:error.details[0].message});
        }
        
        if(req.body.image) user.profile_pic= req.body.image;
        await user.save()
        res.status(200).json({message: "Updated Succesfully"})
    }
    else{
        res.status(400).json({error:"Retry Again"})
    }
})








