import ImgUploadModel from "../models/FileModel.js"

export default class FilesUploadsController{

  static Uploads = async(req, res)=>{
    
   let reqFiles = [];
   for(let i=0; i<req.files.length; i++){
       reqFiles.push(req.files[i].filename)
   }
    let imgData = new ImgUploadModel({
        fileName:req.body.fileName,
        image:reqFiles,
    })

    let saveData = await imgData.save();
    res.send(saveData);
  }

  static GetImages =async(req, res)=>{
    let data =await ImgUploadModel.find()
    .then(async(resultData) => {
       await res.json(resultData)
    }).catch(async(error)=> {
     await res.json(error)
    })
  }

  static findAndUpdateId =(req, res)=>{
    let id = req.params.fileId;
    let data = ImgUploadModel.findById(id)
    .then(async(resultData) => {
       await res.json(resultData)
    }).catch(async(error)=> {
     await res.json(error)
    })
  }

  static UpdateImages =(req, res)=>{
    let updateId = req.params.fileId;
    let data = ImgUploadModel.findByIdAndUpdate(updateId, {$set:{fileName:req.body.fileName, image:req.file.filename }})
    .then((resultData) => {
        res.json(resultData)
    }).catch((error)=> {
      res.json(error)
    })
  }

  static DeleteImages =(req, res)=>{
    let updateId = req.params.fileId;
    let data = ImgUploadModel.findByIdAndDelete(updateId)
      .then((res)=> {  
       res.json(resultData)
    }).catch((error)=> {
      res.json(error)
    })
  }
  
  static UploadsTest =(req, res)=>{
    res.send("get method is called")
    console.log("get method is running");
}
}