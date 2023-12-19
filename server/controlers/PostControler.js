const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('../models/Post');

const getPosts = async (req,res)=>{
    try{
        const Posts = await Post.find().lean()
        res.json(Posts)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting Posts"})
    }
}

const getPost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id).lean()
        if(!post) return res.json({message:"post not found"})
        res.json(post)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting post"})
    }
}

const createPost = async (req,res)=>{
    try{
       const {title,body,tags} = req.body
       if(!title) return res.status(400).json({message:"title is required"})
       if(!body) return res.status(400).json({message:"body is required"})
        const newPost = new Post({
            title,
            body,
            tags
        })

        await newPost.save()
        res.json(newPost)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while creating post"})
    }
}

const updatePost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post) return res.json({message:"post not found"})
        const {title,body,tags} = req.body
        if(title) post.title = title
        if(body) post.body = body
        if(tags) post.tags = tags

        await post.save()
        res.json(post)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while updating post"})
    }
}

const deletePost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post) return res.json({message:"post not found"})
        await post.deleteOne()
        res.json({message:"Post removed"})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while deleting post"})
    }
}
module.exports = {getPosts,getPost,createPost,updatePost,deletePost}

