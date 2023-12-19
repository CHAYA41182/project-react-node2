const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    title:{
        type:String,
        required:false
    },
    link:{
        type:String,
        required:true
    },
    album:{
        type:String,
        required:false
    }
}, { timestamps: true });

const Photo = mongoose.model('Photo',photoSchema)

module.exports = Photo

/*
example of a photo:
{
    title:"travel",
    link:"c:/users/owner/pictures/travel.jpg",
    album:"travel",

},
    
    {
        title:"family",
        link:"c:/users/owner/pictures/family.jpg",
        album:"family",
    
    },
    
    {
        title:"friends",
        link:"c:/users/owner/pictures/friends.jpg",
        album:"friends",
    
    },
    */