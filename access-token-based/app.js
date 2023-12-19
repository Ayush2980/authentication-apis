const express = require('express')
const cors = require('cors');
const mongoose =  require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useragent = require("express-useragent");

//To avoid the rejection of request service 
//from ther servers
app.use(cors());
//using cookie parser to fetch the cookies
app.use(cookieParser());
//required for parsing the data from requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(useragent.express());
//Connecting to the database 
main().catch(e => console.log(e)).then(() => console.log("Database connected !!!"));
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/demoUsers');
}


//Routing 
const auth = require('./routes/auth.js');

app.use('/api' ,auth);





app.listen(8000 , () => {
    console.log("Listening on port 8000")
})