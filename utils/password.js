const bcrypt = require("bcrypt");

async function hashpasswords(password){
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword;
}
module.exports = hashpasswords;