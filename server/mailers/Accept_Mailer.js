const nodemailer = require("../config/NodeMailer");


exports.accept_mailer = (data) => {
    let htmlString = nodemailer.renderTemplate({data:data},'/Accept_Mail_View.ejs')
    nodemailer.transporter.sendMail(
        {
            from   : process.env.GOOGLE_SENDER_EMAIL,
            to     : data.founder.email,
            subject: "Congratulations for your application!",
            html   : htmlString
        },
        (err,info)=>{
            if(err){ console.log('Error occured during mail sending', err); return;}
        }
    )
}

exports.reject_mailer = (data) => {
    let htmlString = nodemailer.renderTemplate({data:data},'/Reject_Mail_View.ejs')
    nodemailer.transporter.sendMail(
        {
            from   : process.env.GOOGLE_SENDER_EMAIL,
            to     : data.founder.email,
            subject: "Rejection of Application from Seedsnitch",
            html   : htmlString
        },
        (err,info)=>{
            if(err){ console.log('Error occured during mail sending', err); return;}
        }
    )
}


exports.ambassador_mail = (data) => {
    let htmlString = nodemailer.renderTemplate({data:data},'/Ambassador.ejs')
    nodemailer.transporter.sendMail(
        {
            from   : process.env.GOOGLE_SENDER_EMAIL,
            to     : data.email,
            subject: "Seedsnitch Campus Ambassador Program: Application Received",
            html   : htmlString
        },
        (err,info)=>{
            if(err){ console.log('Error occured during mail sending', err); return;}
        }
    )
}

