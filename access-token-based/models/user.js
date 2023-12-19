const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
      expirationTime : {
        type : Date,
        required : true
      },
      _id: false,
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, "ucantcrackit" , {expiresIn : 10});
    this.tokens = this.tokens.concat({ token: token , expirationTime :  new Date(Date.now() + 10*1000)});
    return token;
  } catch (e) {
    console.log("Error hit in the mongoose side!!");
    return e;
  }
};

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      console.log("Pass : ", this.password);
      const hashed = await bcrypt.hash(this.password, 10);
      console.log("hashed : ", hashed);
      this.password = hashed;
    }
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model("User", userSchema);
