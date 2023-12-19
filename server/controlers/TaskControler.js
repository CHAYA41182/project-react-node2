const Task = require('../models/Task');

const getTasks = async (req,res)=>{
    try{
        const tasks = await Task.find().lean()
        res.json(tasks)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting tasks"})
    }
}

const getTask = async (req,res)=>{
    try{
        const task = await Task.findById(req.params.id).lean()
        if(!task) return res.json({message:"task not found"})
        res.json(task)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting task"})
    }
}

const createTask = async (req,res)=>{
    try{
       const {title,description,status,icon,tags,important,range} = req.body
       if(!title) return res.status(400).json({message:"title is required"})
        const newTask = new Task({
            title,
            description,
            status,
            icon,
            tags,
            important,
            range
        })
    
        await newTask.save()
        res.json(newTask)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while creating task"})
    }
}

const updateTask = async (req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        if(!task) return res.json({message:"task not found"})
        const {title,description,status,icon,tags,important,range, date} = req.body
        if(title) task.title = title
        if(description) task.description = description
        if(status!==undefined) task.status = status
        if(icon) task.icon = icon
        if(tags) task.tags = tags
        if(important) task.important = important
        if(range) task.range = range
        if(date) task.date = date        
        await task.save()
        res.json(task)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while updating task"})
    }
}

const deleteTask = async (req,res)=>{
    try{
        const {id} = req.params
        if(!id) return res.status(400).json({message:"id is required"})
        const task = await Task.findById(id).exec()
        if(!task) return res.json({message:"task not found"})
        await task.deleteOne()
        res.json({message:"task deleted successfully"})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while deleting task"})
    }
}
module.exports = {getTasks,getTask,createTask,updateTask,deleteTask}

