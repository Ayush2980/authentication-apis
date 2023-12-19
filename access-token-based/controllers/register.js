const userSchema = require('../models/user');

const Register =  async(req , res) => {
    try{
        const {name  ,password} = req.body;
        const userData = {name , password};
        const newUser = new userSchema(userData);
        const jwtToken = await newUser.generateAuthToken();//returns only the token 
        res.cookie('jwt' , jwtToken , {
            expires : new Date(Date.now() + 10*1000),
            httpOnly : true,
        });
        const savedData = await newUser.save();
        res.send({status : 400 , user : savedData});
    }
    catch(e){
        res.send({status : 404 , error: e.message});
    }
}

module.exports= Register;