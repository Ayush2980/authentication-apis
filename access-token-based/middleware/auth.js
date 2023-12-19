const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');
const auth = async (req , res, next) => {
    try{
        const token = req.cookies["jwt"];
        const userId = await jwt.verify(token , "ucantcrackit");
        let actualUser = await userSchema.findById(userId);
        actualUser.tokens = actualUser.tokens.filter((e) => {
            return e.expirationTime >= Date.now();
        });
        await actualUser.save()
        req.user = actualUser;
        req.token = token;
        next();
    }
    catch(e){
        next();
    }

}
 
module.exports= auth;