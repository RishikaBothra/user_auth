const nodemailer = require("nodemailer");


async function sendVerificationEmail(email, VerificationToken, fullname) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:465,
        secure:true,
        auth: {
            user: "rshkbothra@gmail.com",
            pass: "towz qrxd serj ycsk"
        }
    });

    const domain =   'http://localhost:3000'

    const mailOptions = {
        to:email,
        subject:"Verify your email",

        text:`
        Hi ${fullname},
        Please click on the link below to verify your email address.
        ${domain}/verify/${VerificationToken}
     if u have not requested for this email, please ignore this email.

     best wishes,
     Team 10`,

        html:`
        <html>
        <body style = "font-family: sans-serif; line-height:
        1.6;
        colour: #333333;">
        <h2>
        welcome to team 10,
        </h2>
        <p> Hi ${fullname},</p>
        <p>Please click on the link below to verify your email address.</p>

        below:</p>
        <a "${domain}/auth/verify/${VerificationToken}">Verify Email</a>
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

    