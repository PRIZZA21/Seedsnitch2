const asyncHandler = require('express-async-handler');
const { ambassador_mail } = require('../mailers/Accept_Mailer');

exports.send_mail = asyncHandler(async(req,res)=>{

    try {
        
        const details =  {};

        details.fname = req.body.fname;
        details.email = req.body.email;

        const data={
            deatils:details
        }

        ambassador_mail(data)

    
    }
            
    catch (error) {
        
    }
   
  })
  
  
  