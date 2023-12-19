const bcrypt = require("bcrypt");
const { Register } = require("../controllers/register.js");
const auth = require("../middleware/auth.js");
const userSchema = require("../models/user.js");
const schema = require("../utils/schema.js")
const Login = async (req, res) => {
    try{
      const { name, password } = req.body;
      const val = schema.validate({name , password});
      const userData = await userSchema.findOne({name : name});
      const isCorr = await bcrypt.compare(password , userData.password);
      console.log(isCorr);
      if(isCorr){
        const jwtToken = await userData.generateAuthToken();
        res.cookie('jwt' , jwtToken , {
            expires : new Date(Date.now() + 10*1000),
            httpOnly : true,
        })
        const newData = await userData.save();
        res.send({status : 400 , user : newData});
      }
      else throw new Error("incorrect Password")
    }
    catch(e){
      res.send({status  :404 , error : e.message});
    }
  }


module.exports = Login;