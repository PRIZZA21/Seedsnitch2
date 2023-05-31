const nodemailer = require('nodemailer');
const ejs        = require('ejs')
const path       = require('path')

// Responsible for sending emails using the specified configuration.
let Transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp@gmail.com',
    port:587,
    auth: {
        user: process.env.GOOGLE_SENDER_EMAIL,
        pass: process.env.DESTOP_PASSWORD_SMTP
    }
});


// How to show up mails i.e. adding ui through ejs
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if (err){console.log('Error in rendering template', err); return}
            mailHTML = template;
        }
    )
    return mailHTML;
}
 

module.exports = {
    transporter: Transporter,
    renderTemplate: renderTemplate
}