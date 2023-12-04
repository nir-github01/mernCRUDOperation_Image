import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
configDotenv(".env")
import cors from "cors";
import uploadrouter from "./routers/RenderRouterFile.js";
import multer from "multer";
import path from "path";
import mongoDb from "./db/Database.js";
import ImgUploadModel from "./models/FileModel.js";


const server = express();


server.use(cors())
server.use(express.json());
server.use('/public', express.static('public'))

//Database
mongoDb()
//Multer 
let fileNames = [];

server.use('/', uploadrouter)
server.use("/set", uploadrouter);
server.use('/', uploadrouter);
server.use('/update', uploadrouter);
server.use('/remove', uploadrouter);

// server.post('/img/upload', async(req, res)=> {
//       // ImgUploadModel.create({
//       //   filename:req.file.originalname,
//       //   image:req.file.filename,
//       // }).then((response) => {
//       //   response.json()
//       // }).catch((error)=>{
//       //   console.log(error)
//       // })

//       let imgUpload = new ImgUploadModel({
//         filename:req.file.originalname,
//         image:req.file.filename,
//       })

//       let data =await imgUpload.save();
//       console.log(data);
//       res.send(data)
// })
server.get('/getImage', async(req, res) => {
  let data = ImgUploadModel.find().then((data) => {
    res.json(data)

  }).catch(error=> {
    res.json(error)
  })
})

let port = process.env.PORT || 5000;
server.listen(port, async(req, res) => {
   console.log(`Server is running on.. http://localhost:${port}`)
})