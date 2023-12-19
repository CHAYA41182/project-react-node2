const Photo = require('../models/Photo');

const getPhotos = async (req,res)=>{
    try{
        const Photos = await Photo.find().lean()
        res.json(Photos)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting Photos"})
    }
}

const getPhoto = async (req,res)=>{
    try{
        const photo = await Photo.findById(req.params.id).lean()
        if(!photo) return res.json({message:"photo not found"})
        res.json(photo)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while getting photo"})
    }
}

const createPhoto = async (req,res)=>{
    try{
       const {title, link, album} = req.body
         if(!link) return res.status(400).json({message:"link is required"})
        const newPhoto = new Photo({
            title,
            link,
            album
        })
    
        await newPhoto.save()
        res.json(newPhoto)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while creating photo"})
    }
}

const updatePhoto = async (req,res)=>{
    try{
        const photo = await Photo.findById(req.params.id)
        if(!photo) return res.json({message:"photo not found"})
        const {title, link, album} = req.body
        
        if(title) photo.title = title
        if(link) photo.link = link
        if(album) photo.album = album


        await photo.save()
        res.json(photo)
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while updating photo"})
    }
}

const deletePhoto = async (req,res)=>{
    try{
        const photo = await Photo.findById(req.params.id)
        if(!photo) return res.status(400).json({message:"photo not found"})
        await photo.deleteOne()
        res.json({message:"Photo removed"})
    }catch(err){
        console.log(err)
        res.status(400).json({message:"error while deleting photo"})
    }
}
module.exports = {getPhotos,getPhoto,createPhoto,updatePhoto,deletePhoto}

