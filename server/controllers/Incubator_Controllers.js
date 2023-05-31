const expressAsyncHandler = require("express-async-handler");
const Incubator_Model = require("../models/Incubator_Model");
const User_Model = require("../models/User_Model");


/* 
    @description This route gives all incubator in database
    @method Get
    @route /api/incubators/
*/

exports.getAllIncubators = expressAsyncHandler(async(req,res) => {

    try {
        
        const pageSize = 4
        const page = Number(req.query.pageNumber) || 1 
        const count = await Incubator_Model.count()
  
        let incubators = await Incubator_Model
        .find()
        .populate("applications_submitted.application_id","startup_name")
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize*(page-1))

        // console.log(incubators);


        res.status(200).json({incubators,page,pages: Math.ceil(count/pageSize)});
    } 
    catch (err) {
        console.log(err);
      res.status(400).json({error: "Server Error"});
    }
});





/* 
    @description This route create incubator in database
    @method Post
    @route /api/incubators/crate
*/


exports.createIncubator = async(req,res) => {

    const incubator = new Incubator_Model({
        name: req.body.name,
        email: req.body.email,
    });

    const pwd =
    req.body.name.split(" ")[0].charAt(0).toUpperCase() +
    req.body.name.split(" ")[0].substring(1) +
    "@" +
    "2023";


    const incubator_user = new User_Model({
        name: req.body.name,
        email: req.body.email,
        password: pwd,
        isIncubator: true,
    });
    

    try {
        await incubator.save();
        await incubator_user.save();
        res.status(200).send('Incubator created successfully');
    } catch (error) {
        res.status(400).send({ message: error.message || "An error occurred while creating the incubator" });
    }

}


exports.toggleIncubator = expressAsyncHandler(async(req,res) => {
  
    try {

        const incubator = await Incubator_Model.findById(req.params.id)

        if(incubator){
            incubator.active = !incubator.active
            await incubator.save()
            res.status(200).json({message: "Updated Succesfully"})
        }
        else{
            res.status(400).json({error:"Incubator Not Found"})
        } 
    } catch (error) {
        console.log(error);
    }
   
})