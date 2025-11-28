const mongoose= require('mongoose')
const app = require("express");
const url = 'mongodb://localhost:27017/Ecomme'

const connectDB =async ()=>{
    try{
        await mongoose.connect(url)
        console.log('mongoose connected')
    }catch(err){
        console.log(err)
    }
}


module.exports = connectDB