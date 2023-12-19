const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User');

const getUsers = async (req,res)=>{
    try{
        const users = await User.find().lean()
        res.json(users)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting users"})
    }
}

const getUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id).lean()
        if(!user) return res.json({message:"user not found"})
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting user"})
    }
}

const createUser = async (req,res)=>{
    try{
       const {name, email, password, roles} = req.body
         if(!name) return res.status(400).json({message:"name is required"})
         if(!password) return res.status(400).json({message:"password is required"})
         if(!roles) return res.status(400).json({message:"roles is required"})
         if(!email) return res.status(400).json({message:"email is required"})

         const newUser = new User({
            name,
            email,
            password,
            roles
        })
    
        await newUser.save()
        res.json(newUser)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while creating user"})
    }
}

const updateUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.json({message:"user not found"})
        const {name, email, password, roles} = req.body

        if(name) user.name = name
        if(email) user.email = email
        if(password) user.password = password
        if(roles) user.roles = roles


        await user.save()
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while updating user"})
    }
}

const deleteUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.json({message:"user not found"})
        await user.deleteOne()
        res.json({message:"User removed"})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while deleting user"})
    }
}
module.exports = {getUsers,getUser,createUser,updateUser,deleteUser}

