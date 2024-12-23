const mongoose = require("mongoose");
const config = require("./config");

async function connectDB(){

    try{
        await mongoose.connect(config.MONGODB_url);
        console.log("Database connected");
    }
    catch(err){
        console.log(err);
    }


}
async function getusercollection(){
        try {
            await connectDB();
            return mongoose.connection.db.collection("user");
        } catch (err) {
            console.log(err);
            throw err;
        }
}


module.exports = {connectDB,getusercollection};