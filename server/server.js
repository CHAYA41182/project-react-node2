const express = require('express');
const app = express();
const cors = require('cors')


const PORT = process.env.PORT || 7001

const connectDB = require('./config/connectDB');
const corsOption = require('./config/corsOption');
const { default: mongoose } = require('mongoose');

connectDB()

app.use(cors(corsOption))
app.use(express.json())
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/api/tasks",require("./routes/tasksRoutes"))
app.use("/api/users",require("./routes/usersRoutes"))
app.use("/api/posts",require("./routes/postsRoutes"))
app.use("/api/photos",require("./routes/photosRoutes"))

mongoose.connection.once('open',()=>{
    console.log("connected to DB successfully")
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})

mongoose.connection.on('error',(err)=>{
    console.log("error conection to DB ",err)
})
