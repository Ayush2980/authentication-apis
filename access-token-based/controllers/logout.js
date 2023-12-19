const bcrypt = require("bcrypt");
const { Register } = require("../controllers/register.js");
const userSchema = require("../models/user.js");
const Logout = async (req, res) => {
    try{
      let loggedInUser = await userSchema.findById({_id : req.user._id});
      // console.log(loggedInUser);
      // console.log(req.token);
      const updatedUser = await userSchema.findByIdAndUpdate({_id : req.user._id} , {$pull : {tokens : { token : req.token}}});
      res.clearCookie('jwt')
      // console.log(updatedUser)
      res.send({status : 400 , data: "Logged Out Succesfully"})
    }
    catch(e){
      res.send({status  :404 , error : e.message});
    }
  }

module.exports = Logout;