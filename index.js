const express = require("express")

const config = require("./config/config.js")
const userauth = require("./routes/user_auth.js")
const {connectDB} = require("./config/db.js")

const app = express()
connectDB()

app.use(express.json())
app.use("/api/user/auth", userauth)

app.listen(config.PORT, function () {
  console.log("Server is running on port"+config.PORT);
});

