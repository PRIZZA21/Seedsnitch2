const nodemailer = require("../config/NodeMailer");


exports.register_mailer = (data) => {
    let htmlString = nodemailer.renderTemplate({data:data},'/Register_Mail_View.ejs')
    nodemailer.transporter.sendMail(
        {
            from   : process.env.GOOGLE_SENDER_EMAIL,
            to     : data.email,
            subject: "Thanks for registering to Seedsnitch!",
            html   : htmlString
        },
        (err,info)=>{
            if(err){ console.log('Error occured during mail sending', err); return;}
        }
    )
}

