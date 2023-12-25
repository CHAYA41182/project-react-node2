const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:false
    },
    important:{
        type:Boolean,
        default:false
    },
    range:{
        type:Number,
        min:0,
        max:5,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    
    date: {
        type: Date,
        default: () => Date.now() + 1000 * 60 * 60 * 24 * 7
      },
    icon:{
        type:String,
        default:"📝",
        maxlength:7
    }
},{timestamps:true})

const Task = mongoose.model('Task',taskSchema)
module.exports = Task

/*
example of a task:
{
    title:"learn react",
    description:"learn react from scrimba",
    status:false,
    icon:"😣
},

{
    title:"do the dishes",
    description:"do the dishes after dinner",
    status:false,
    icon:"🧼
},

{
    title:"do homework",
    description:"do homework for school",
    status:false,
    icon:"📚

},

{
    {
    title:"do laundry",
    description:"do laundry for the week",
    status:false,
    icon:"🧺
    }



*/
    