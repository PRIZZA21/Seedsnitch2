const asyncHandler = require('express-async-handler');
const { accept_mailer, reject_mailer } = require('../mailers/Accept_Mailer');
const Application_Model = require('../models/Application_Model');
const Application = require('../models/Application_Model');
const Incubator_Model = require('../models/Incubator_Model');
const User_Model = require('../models/User_Model');



// Service to shift applications after 24 hrs


const applications24hrchecker = asyncHandler(async()=>{
    const incubators = await Incubator_Model.find();

    for(let i =0;i<incubators.length;i++){

        let applications_of_this = incubators[i].applications_submitted

        for(let j=0;j<applications_of_this.length;j++){
            // console.log("iski baat hai",applications_of_this[j]);
            let timestamp2= new Date()
            let timestamp1 = applications_of_this[j].timestamp
            if(timestamp2!==undefined && timestamp1!==undefined)
            {let diffInseonds = Math.round((timestamp2.getTime() - timestamp1.getTime()) / 1000);
            if(diffInseonds>86400) shiftApplication(incubators[i]._id,applications_of_this[j].application_id)}
      }
    }
})


const shiftApplication = asyncHandler(async(inc_id,application_id) => {
    
    console.log(inc_id,application_id);

    const currentIncubatorassigned = await Incubator_Model.findById(inc_id);
    const incubators = await Incubator_Model.find();
    let currentIncubator = incubators[0];
    let currApplications =1000;

    for(let i=0;i<incubators.length;i++){
        let appln_now = incubators[i].applications_submitted.length;
        if(appln_now<currApplications && incubators[i]!==currentIncubatorassigned && incubators[i].active){ 
            currApplications = incubators[i].applications_submitted.length;
            currentIncubator = incubators[i];
        }
    }

    await Application.updateOne(
        { _id: application_id },
        { $set: { assigned_incubator: currentIncubator._id } }
    );

    
    await Incubator_Model.updateOne({_id:inc_id},
        { $pull: 
            { applications_submitted:  { application_id: application_id }} 
        }
    );

    await Incubator_Model.updateOne({_id:currentIncubator._id},
        { $push: 
            { applications_submitted:  { application_id: application_id, timestamp: new Date() }} 
        }
    );
})




const not_have_appln =  asyncHandler((id,appln_id,incubators)=> {
    let inc = null;
    for(let i=0;i<incubators.length;i++) if(incubators[i]._id===id) inc = incubators[i]
    let rejected_applns = inc.applications_rejected;
    let b =true;
 
    for(let i=0;i<rejected_applns.length;i++){
        if((rejected_applns[i].application_id.toString())===appln_id.toString()) { b=false; break;}
    }
    return b;
})
  

  
const assignApplication = asyncHandler(async() => {

    try {
  
      const applications = await Application_Model.find();
      const incubators = await Incubator_Model.find();
      
      for (let i = 0; i < applications.length; i++) 
        if (applications[i].assigned_incubator === null ) {

            let currentIncubator = incubators[i % incubators.length];
            let currApplications =1000;

            for(let j=0;j<incubators.length;j++){
                let check =  await not_have_appln(incubators[j]._id,applications[i]._id,incubators);
                console.log("\n\n Checlk hai ",incubators[j].name," ke pass ",applications[i]._id," ",check,"\n");
                let appln_now = incubators[j].applications_submitted.length;
                if(appln_now<=currApplications && !check &&  incubators[j].active){ 
                    currApplications = incubators[j].applications_submitted.length;
                    currentIncubator = incubators[j];
                }
            }

      
    
            if(!not_have_appln(currentIncubator._id,applications[i]._id,incubators) || !currentIncubator.active){
                await Application.updateOne(
                    { _id: applications[i]._id },
                    { $set: { curr_status: "Rejected" } }
                );
                return ;
            }
  
            await Application_Model.updateOne({ _id: applications[i]._id },
                { $set: { assigned_incubator: currentIncubator._id } }
            );
    
            await Incubator_Model.updateOne(
                {_id:currentIncubator._id},
                { $push: { applications_submitted:  {  application_id: applications[i]._id,  timestamp: new Date() }}}
            );

        }
    } 
    
    catch (err) {
      console.log(err);
    }

  })

  



/* 
    @description This route gives all applications in database
    @method Get
    @route /api/applications/
*/

exports.getAllApplications = asyncHandler(async(req,res) => {
    try {
        applications24hrchecker();
        const pageSize = 4
    
        const page = Number(req.query.pageNumber) || 1 
        const keyword = req.query.keyword?{
            name:{
                $regex: req.query.keyword,
                $options: 'i'
            }
        }: {}
        const count = await Application_Model.count({...keyword})
    
        let all_applications = await Application_Model
        .find({...keyword})
        .populate("creator", "name -_id")
        .populate("assigned_incubator","name email")
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize*(page-1));
    
        res.status(200).json({all_applications,page,pages: Math.ceil(count/pageSize)});
    
    } catch (error) {
        
    }
   })




/* 
    @description This route gives all applications in database submitted by requested founder
    @method Get
    @route /api/applications/creator/:id
*/

exports.getApplicationsByCreatorId = asyncHandler(async (req, res) => {
    try {
      applications24hrchecker();
      const user = await User_Model.findById(req.params.id);
      if (!user) {res.status(400).json({error:"User for which applications are requested does not exist"}); return;}

      const pageSize = 4
      const page = Number(req.query.pageNumber) || 1 
      const count = await Application_Model.count({ creator: req.params.id })
  
      const applications = await Application_Model
        .find({ creator: req.params.id })
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize*(page-1));

      res.status(200).json({applications,page,pages: Math.ceil(count/pageSize)});
    } 
    catch (err) {
      res.status(400).json({error: "Server Error"});
    }
});
  



/* 
    @description This route gives all applications in database for requested incubator
    @method Get
    @route /api/applications/incubator
*/


exports.getApplicationsByIncubatorId = asyncHandler(async(req,res)=>{
    try{

        applications24hrchecker();
        const incubator = await Incubator_Model.findOne({"email": req.user.email})
        const pageSize = 4
        const page = Number(req.query.pageNumber) || 1 
        
        const count = await Application_Model.count(
            { $or: [
                {_id: { $in: incubator.applications_submitted.map(application => application.application_id) }},
                {_id: { $in: incubator.applications_rejected.map(application => application.application_id) }},
                {_id: { $in: incubator.applications_accepted.map(application => application.application_id) }},
            ]
            }
        )

            // const count = await Application_Model.count({assigned_incubator: incubator})
            // const applications = await Application_Model
            // .find({assigned_incubator: incubator})
            // .populate('assigned_incubator')
            // .sort({createdAt: -1})
            // .limit(pageSize)
            // .skip(pageSize*(page-1));

            const applications = await Application_Model
            .find({ $or: [
                {_id: { $in: incubator.applications_submitted.map(application => application.application_id) }},
                {_id: { $in: incubator.applications_rejected.map(application => application.application_id) }},
                {_id: { $in: incubator.applications_accepted.map(application => application.application_id) }},
            ]
            })
            .populate('assigned_incubator')
            .sort({createdAt: -1})
            .skip(pageSize * (page - 1))
            .limit(pageSize);

            res.status(200).json({applications,page,pages: Math.ceil(count/pageSize)});
            // console.log(applications);
        
        
    }
    catch(err){
        res.status(400).json({error: "Server Error"});
    }
})

  



/* 
    @description This route gives application details in database
    @method Post
    @route /api/applications/details
*/

exports.getApplicationDetailsById = asyncHandler(async(req,res)=>{
    try {
        const application = await Application_Model.findOne({ _id: req.body.appln_id })
        res.status(200).json(application);
    } 
    catch (err) {
        return res.status(400).json({message: "This application does not exist"});
    }
})




/* 
    @description This route create the application with fiven details in database
    @method Post
    @route /api/applications/create
*/

exports.createApplication = asyncHandler(async (req, res) => {

    try {
        const application = new Application_Model({
            name: req.body.name,
            email: req.body.email,
            startup_name: req.body.startup_name,
            linkedin_profile: req.body.linkedin_profile,
            college_name: req.body.college_name,
            contact_number: req.body.contact_number,
            startup_stage: req.body.start_up_stage,
            startup_problem: req.body.start_up_problem,
            startup_differentiator: req.body.start_up_differentiator,
            creator: req.user._id,
            pitch_deck : req.body.pdf
        });

        await application.save();
        applications24hrchecker()
        res.status(200).json({message: "Application succesfully created"});

        // let applications_all = await Application_Model.find()
        // console.log("\n\n\n",applications_all);
        
        const incubators = await Incubator_Model.find();
        let currApplications =1000;
        
        for(let j=0;j<incubators.length;j++){
            let appln_now = incubators[j].applications_submitted.length;
            if(appln_now<=currApplications && incubators[j].active){ 
                currApplications = incubators[j].applications_submitted.length;
                currentIncubator = incubators[j];
            }
        }

        if(currentIncubator.active===false){
            await Application_Model.updateOne(
                { _id: application._id },
                { $set: { curr_status: "Rejected" } }
            );
        }

        await Application_Model.updateOne({ _id: application._id },
            { $set: { assigned_incubator: currentIncubator._id } }
        );

        await Incubator_Model.updateOne(
            {_id:currentIncubator._id},
            { $push: { applications_submitted:  {  application_id: application._id,  timestamp: new Date() }}}
        );

        // assignApplication();

        // applications_bat = await Application_Model.find()
        // // console.log("\n\n\n\n",applications_bat);
    } 

    catch (err) {
        res.status(400).json({error: "Error in creating application"});
    }
})
  





// exports.acceptApplication = asyncHandler(async(req,res)=>{

//     try {
//         await Application_Model.updateOne(
//             { _id: req.params.id },
//             { $set: { curr_status: "Accepted" } }
//         );
    
//         let appln_id = req.params.id;
        
//         await Incubator_Model.updateOne(
//             { email: req.body.email },
//             { $push: { applications_accepted: { application_id: appln_id, reason: req.body.reason } }}
//         )
    
    
//         await Incubator_Model.updateOne(
//             {email: req.body.email},
//             { $pull: { "applications_submitted":  { "application_id": appln_id  }}}
//         );
        
//         res.status(200).json({message: "Application accepted"})

//     } 
    
//     catch (error) {
//         res.status(400).json({error: "Error in accepting application"});
//     }

// })






// exports.rejectApplication = asyncHandler(async(req,res)=>{

//     try {

//         await Application_Model.updateOne(
//             { _id: req.params.id },
//             { $set: { assigned_incubator: null } }
//         );
        
        
//         let appln_id = req.params.id;
        
//         await Incubator_Model.updateOne(
//             {email: req.body.email},
//             { $push: { applications_rejected: { application_id: appln_id, reason: req.body.reason}}}
//         )
        
        
//         await Incubator_Model.updateOne(
//             {email: req.body.email},
//             { $pull: { "applications_submitted": { "application_id": appln_id} } }
//         );
        
//         assignApplication();
    
//         res.status(200).json({message: "Application rejected"})
//     } 
    
//     catch (error) {
//         res.status(400).json({error: "Error in rejecting application"});
//     }

  
// })







exports.acceptApplication = asyncHandler(async(req,res)=>{

    try {
        await Application_Model.updateOne({ _id: req.params.id },
            { $set: { curr_status: "Accepted" } }
          );
        
          let appln_id = req.params.id;
      
          await Incubator_Model.updateOne(
              { email: req.body.email },
              { $push: { 
                applications_accepted: 
                {
                  application_id: appln_id,
                  reason: req.body.reason
                }
              }
            }
            )

   
        
      
          await Incubator_Model.updateOne({email: req.body.email},
            { $pull: {
              "applications_submitted":  { 
                "application_id": appln_id
              }
            } 
          });

          const founder_details = await Application_Model.findOne({ _id: req.params.id }).populate("creator")
          const incubator_details = await  Incubator_Model.findOne({email: req.body.email})
           
            const data={
                accept_Reason:req.body.reason,
                founder: founder_details,
                incubator: incubator_details
            }
    
          
          accept_mailer(data)
          res.send("Application accepted")
    } catch (error) {
        
    }

    
})
  
  
  
exports.rejectApplication = asyncHandler(async(req,res)=>{

    try {
        await Application_Model
        .updateOne(
            { _id: req.params.id }, 
            { $set: { assigned_incubator: null } }
        );
    
        
        let appln_id = req.params.id;
       
        await Incubator_Model.updateOne(
            { email: req.body.email },
            { $push: { applications_rejected: { application_id: appln_id, reason: req.body.reason}}}
        )
    
       
    
    
        // Incubator_Model.findOne({email:req.body.email}).then((res)=>console.log(res))
    
    
          await Incubator_Model.updateOne({email: req.body.email},
            { $pull: {
              "applications_submitted": { 
                "application_id": appln_id,
              }
            } 
          });
    
         
        // const i = await Incubator_Model.findOne({email:req.body.email})
        // console.log(i);
      
        const applications = await Application_Model.find();
        const incubators = await Incubator_Model.find();
            
        for (let i = 0; i < applications.length; i++) 
            if (applications[i].assigned_incubator === null ) {

                let currentIncubator = incubators[0];
                let currApplications =1000;
    
                for(let j=0;j<incubators.length;j++){
                    let check =  await not_have_appln(incubators[j]._id,applications[i]._id,incubators);
                    let appln_now = incubators[j].applications_submitted.length;
                    if(appln_now<=currApplications && check && incubators[j].active){ 
                        currApplications = incubators[j].applications_submitted.length;
                        currentIncubator = incubators[j];
                    }
                }
    
                const b= await not_have_appln(currentIncubator._id,applications[i]._id,incubators);
    
    
      
                if(!b || !currentIncubator.active){

                    const incubators = await Incubator_Model.find();
                    const reasons =[];

                    // console.log("\n\n\n\nye hai ji",incubators);

                    for(let i=0;i<incubators.length;i++){
                        const rejected_applns = incubators[i].applications_rejected;
                        // console.log("\n\n\n\nRejcted applns ",rejected_applns);
                        for(let j=0;j<rejected_applns.length;j++){
                            let a = rejected_applns[j].application_id.toString();
                            let b = req.params.id.toString();
                            // console.log("a hai ji\n\n",a,"b hai jin\n\n\n",b);
                            if(a===b){
                                reasons.push(rejected_applns[j].reason);
                                // console.log("\n\n\nRejcted reason ",rejected_applns[j].reason);
                            }
                        }
                    }

                    const founder_details = await Application_Model.findOne({ _id: req.params.id }).populate("creator")

                    const data={
                        arr:reasons,
                        founder: founder_details,
                    }

                    // console.log(reasons);
            
                  
                    reject_mailer(data)

                    await Application_Model.updateOne(
                        { _id: applications[i]._id },
                        { $set: { curr_status: "Rejected" } }
                    );
                    return;
                }
    
                else{
                    await Application_Model.updateOne({ _id: applications[i]._id },
                        { $set: { assigned_incubator: currentIncubator._id } }
                    );
            
                    
                    await Incubator_Model.updateOne(
                        {_id:currentIncubator._id},
                        { $push: { applications_submitted:  {  application_id: applications[i]._id,  timestamp: new Date() }}}
                    );
    
                    const ity = await Incubator_Model.findOne({_id:currentIncubator._id});
                    
                    
                }
      
              }
              
      
        res.send("Application rejected")
    } catch (error) {
        
    }
   
  })
  
  
  