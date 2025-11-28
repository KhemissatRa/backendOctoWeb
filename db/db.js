const mongoose= require('mongoose')
const app = require("express");
const url = "mongodb+srv://khemissatraouf98_db_user:<db_password>@cluster0.5dsyf89.mongodb.net/?appName=Cluster0";




mongoose.connect(url)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("Error:", err));


module.exports = connectDB