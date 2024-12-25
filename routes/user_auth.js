const user = require("../config/db.js");
const hashpassword = require("../utils/password.js");
const User = require("../models/userschema.js");
const generateToken = require("../utils/tokens.js");
const { Router } = require("express")
const { getusercollection } = require("../config/db.js")
const sendEmail = require("../utils/sendEmail.js");
const sendVerificationEmail = require("../utils/sendEmail.js");
const userauth = Router()
const crypto = require("crypto");
const config = require("../config/config.js");

userauth.post("/registration", async function (req, res) {

    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ error: "Please enter all the fields" });
        }

        const userCollection = await getusercollection();
        const existingUser = await userCollection.findOne({ email: email });


        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });}
        
        const hashedPassword = await hashpassword(password);
        const VerificationToken = await generateToken(fullname,email);
        

        const user = await userCollection.insertOne({
            fullname: fullname,
            email: email,
            password: hashedPassword,
            isVerified: false,
            VerificationToken: VerificationToken
        });

        if (user.acknowledged){
            const VerificationLink = `${config.URL}/verify-email?token=${VerificationToken}`;
            console.log(`Verification link: ${VerificationLink}`);


            await sendVerificationEmail(email, VerificationLink, fullname);

            res.status(201).send("User Registered Successfully.Please check your email for verification link");
        }
        else{
            res.status(500).send("Error try again");
        }

        // as here insertOne is being used the below step is of no need..
        /*await user.save()
            .then(() => {
                res.status(201).send("User Registered Successfully");
            })
            .catch(err => {
                res.status(500).send("Error try again");
            });*/
    }

    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

userauth.post("/verify-email", async function (req, res) {
    try{
        const { token } = req.query;

        if(!token){
            res.status(400).send("Invalid verification token");
        }
        const userCollection = await getusercollection();
        const user = await userCollection.findOne({ VerificationToken: token });
        if(!user){

            return res.status(400).send("user not found or already verified");
        }
        await userCollection.updateOne(
            {_id: user._id},
            {$set: {isVerified: true}}
        );
        res.status(200).send("Email verified successfully and u can log in now");
    }
        catch (error){
            console.error("Registration error:", error);    
            return res.status(500).json({ error: "Internal server error" });

        }
        }
)


userauth.post("/reset-password", async function (req, res) {
    try{
        const{email} = req.body;
        if(!email){
            return res.status(400).send("Please enter your email");


            const usercollection = await getusercollection();
            const user = await usercollection.findOne({email:email});
            if(!user){
                return res.status(400).send("User not found");
            }
            const token = generateToken(user.fullname,user.email);
            await sendResetPasswordEmail(email,token);
            res.status(200).send("Email sent successfully");
            console.log("reset password token is "+token);
        }
        else{
            return res.status(500).send("Error try again"); 
   
        }
    
    }
    catch (error){
        console.error("Registration error:", error);    
        return res.status(500).json({ error: "Internal server error" });

    }
})
userauth.post("/login", function (res, req) {
    const { email, password } = req.body;

    if (!email, !password) {
        res.status(400).send("Please enter all the fields")
    }

    else {
        user.findOne({ email })
            .then(user => {
                if (user) {
                    const hashedpassword = hashpassword(password)
                    if (user.hashedpassowrd === hashedpassword) {
                        res.status(200).send("Login Successful")
                        const token = generateToken(user.fullname, user.email)
                        console.log("token is " + token)


                    }
                }
                else {
                    res.status(404).send("User not found")
                }
            })
            .catch(err =>
                res.status(500).send("Error try again")
            )

    }
})

module.exports = userauth




