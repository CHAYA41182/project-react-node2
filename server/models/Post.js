const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    aothor:{
        type:String,
    },
    tags:{
        type:[String],
        required:true,
        default:["general"]
    },
},{timestamps:true})

const Post = mongoose.model('Post',postSchema)
module.exports = Post


/*
example of a post:
{
    title:"how to make a full stack app",
    body:"this is how you make a full stack app with react and node js: ...",
    tags:["react","nodejs","fullstack"]
},

{
    title: "שיר לחנוכה",
    body: "אני רוצה לשיר לחנוכה עם כל הילדים",
    tags: ["חנוכה", "שירים", "ילדים"]
},

{

    title: "ספר על חנוכה",
    body: "אני רוצה לכתוב ספר על חנוכה",
    tags: ["חנוכה", "ספרים", "ילדים"]

},
*/