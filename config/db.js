const mongoose = require("mongoose");
const config = require("./config");

async function connectDB(){

    try{
        await mongoose.connect(config.MONGODB_url);
        console.log("Database connected");
    }
    catch(err){
        return(err);
    }


}
async function getusercollection(){
        try {
            await connectDB();
            return mongoose.connection.db.collection("user");
        } catch (err) {
            return(err);
            
        }
}


module.exports = {connectDB,getusercollection};