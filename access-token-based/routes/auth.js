const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const Logout = require("../controllers/logout.js")
const Login = require("../controllers/login.js");
const Register = require('../controllers/register.js');
const {catchAsync} = require("../utils/catchAsync.js")


router.post("/login",catchAsync(Login));
router.post("/logout", auth , catchAsync(Logout));
router.post("/register" ,catchAsync(Register));


module.exports = router;