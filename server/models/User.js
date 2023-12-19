const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:[String],
        required:true,
        default:["user"]
    },
},{timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports = User

/*
example of a user:
{
    "name":"owner",
    "email":"owner@gmail.com",
    "password":"123456",
    "roles":["admin", "user"]
},

{
    "name":"user",
    "email":"",
    "password":"123456",
    "roles":["user"]
},
*/
