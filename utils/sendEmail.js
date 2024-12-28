const nodemailer = require("nodemailer");
const config = require("../config/config.js");

async function sendVerificationEmail(email, VerificationLink, fullname) {
    const transporter = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        port:config.EMAIL_PORT,
        secure:true,
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASSWORD
        }
    });

    const domain = config.URL;

    const mailOptions = {
        to:email,
        subject:"Verify your email",

        text:`
        Hi ${fullname},
        Please click on the link below to verify your email address.
        ${VerificationLink}
     if u have not requested for this email, please ignore this email.

     best wishes,
     Rishika`,

        html:`
        <html>
        <body style = "font-family: sans-serif; line-height:
        1.6;
        colour: #333333;">
        <h2>
        Welcome ,
        </h2>
        <p> Hi ${fullname},</p>
        <p>Please click on the link below to verify your email address.</p>

        below:
        </p>
        <br> 
        <a href = "${domain}/auth/verify/${VerificationLink}">Verify Email</a>
        <p>if u have not requested for this email, please ignore this email.</p>

        <p>best wishes,</p>
        <p>Team 10</p>
        </body>
        </html>
    `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendVerificationEmail;

    