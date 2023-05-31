const Ecell_Model = require("../models/Ecell_Model");
const User_Model = require("../models/User_Model");

// Library for async requests
const asyncHandler=require('express-async-handler')



/* 
    @description This route gives all ecells in database
    @method Get
    @route /api/ecells/
*/

exports.getAllEcells = asyncHandler(async(req,res) => {
    try{

    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1 
    const count = await Ecell_Model.count()
    
    let all_ecells = await  Ecell_Model
    .find()
    .sort({createdAt: -1})
    .limit(pageSize)
    .skip(pageSize*(page-1));



    res.status(200).json({all_ecells,page,pages: Math.ceil(count/pageSize)});
    // res.status(200).json({all_Ecells,page,pages: Math.ceil(count/pageSize)});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error in fetching all ecells"})
    }
})


exports.getTotalEcells = asyncHandler(async(req,res) => {
    try{

    let all_ecells = await  Ecell_Model
    .find()
    .sort({createdAt: -1})
   

    res.status(200).send(all_ecells);
   
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Error in fetching all ecells"})
    }
})




/* 
    @description This route create ecell in database
    @method Post
    @route /api/ecells/crate
*/


exports.createEcell = async(req,res) => {

    const ecell = new Ecell_Model({
        name: req.body.name,
        email: req.body.email,
        college: req.body.college,
        logo: req.body.image
    });
    

    const pwd =
    req.body.name.split(" ")[0].charAt(0).toUpperCase() +
    req.body.name.split(" ")[0].substring(1) +
    "@" +
    "2023";


    const ecell_user = new User_Model({
        name: req.body.name,
        email: req.body.email,
        profile_pic: req.body.image,
        password: pwd,
        isAmbassador: true
    });
    

    try {
        await ecell.save();
        await ecell_user.save();
        res.status(200).send('Ecell created successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message || "An error occurred while creating the ecell" });
    }

}




/* 
    @description This route gives the profile info for logged in user
    @method Get
    @route /api/users/profile
*/


exports.getEcelldetails = asyncHandler(async(req,res) => {

    const ecell = await Ecell_Model.findById(req.params.id)

    if(ecell){
        res.status(200).json({
            name:ecell.name,
            email: ecell.email,
            logo: ecell.logo,
            college: ecell.college
        })
    }

    else{
        res.status(400).json({error:"Ecell Not Found"})
    }
})




/* 
    @description This route updates the profile info for logged in user
    @method Put
    @route /api/users/profile
*/


exports.updateEcelldetails = asyncHandler(async(req,res) => {
  
    try {
        const ecell = await Ecell_Model.findById(req.params.id)

    if(ecell){
        ecell.name = req.body.name || ecell.name
        ecell.email= req.body.email || ecell.email
        ecell.college= req.body.college || ecell.college
        ecell.logo= req.body.image || ecell.logo
        await ecell.save()
        res.status(200).json({message: "Updated Succesfully"})
    }
    else{
        res.status(400).json({error:"Ecell Not Found"})
    } 
    } catch (error) {
        console.log(error);
    }
   
})