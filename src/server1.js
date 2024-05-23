//server1.js
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./route1');
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://sethvansh2004:vanshseth2004@oc.4i1q8wr.mongodb.net/Users?retryWrites=true&w=majority&appName=oc")

app.use("/",router);


app.listen(3002,function(){
    console.log("express server is running on port 3002");
})