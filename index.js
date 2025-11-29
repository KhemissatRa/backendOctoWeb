const express = require("express")
const app = express()
const dotenv =require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(cors({
  origin: "*",
  credentials: false
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // optional, for form data
console.log("Node TLS version:", process.versions.openssl);

const port = process.env.PORT || 5000;
console.log("MONGO_URL:", process.env.MONGO_URL);

const connectDB = require('./db/db')
connectDB();






const productRouter = require('./route/product')
app.use('/', productRouter)
const Order = require('./route/order')
app.use('/',Order)
const adminRouter = require('./route/admin')
app.use('/',adminRouter)  
