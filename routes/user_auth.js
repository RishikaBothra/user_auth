
const user = require("../config/db.js");
const hashpassword = require("../utils/password.js");
const User = require("../models/userschema.js");
const generateToken = require("../utils/tokens.js");
const { Router } = require("express")
const { getusercollection } = require("../config/db.js")
const userauth = Router()

userauth.post("/registration", async function (req, res) {

    try {
        const { fullname, email, password } = req.body;

        // Proper syntax for checking multiple conditions
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: "Please enter all the fields" });
        }

        const userCollection = await getusercollection();
        const existingUser = await userCollection.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }




        const hashedPassword = await hashpassword(password);


        const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        });



        user.save()
            .then(() => {
                res.status(201).send("User Registered Successfully");
            })
            .catch(err => {
                res.status(500).send("Error try again");
            });
    }

    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});




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




