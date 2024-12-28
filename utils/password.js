const bcrypt = require("bcrypt");

async function hashpasswords(password){
    try{
        const hashesPassword = await bcrypt.hash(password,10);
        return hashesPassword;

    }
    catch(err){
        return("Error while hashing password");
        throw err;
    }
    
}
module.exports = hashpasswords;