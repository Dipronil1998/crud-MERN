const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const mongoose = require('mongoose');
const { createShorthandPropertyAssignment } = require("typescript");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images")))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
mongoose.connect('mongodb+srv://admin:admin@cluster0.ux7ub.mongodb.net/UdemyMEAN?retryWrites=true&w=majority')
.then(()=>{
  console.log("Connection Successfully");
})
.catch((e)=>{
  console.log("Connection Error");
});


app.use("/api/posts", postsRoute)
app.use("/api/user", usersRoute)

module.exports = app;

