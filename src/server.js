const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./route'); // Ensure this path is correct

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://sethvansh2004:vanshseth2004@oc.4i1q8wr.mongodb.net/orders?retryWrites=true&w=majority&appName=oc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", router); 

app.listen(3001, function() {
  console.log("Express server is running on port 3001");
});
