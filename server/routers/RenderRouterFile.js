import express from "express";
import FilesUploadsController from "../modules/Controllers.js";
import multer from "multer";
import path from "path";

let uploadrouter = express.Router();

let storage = multer.diskStorage({
  destination:(req, file, callback)=> {
    callback(null, "public");
  },
  filename:(req, file, callback)=> {
    const fileNameArray=[];
    callback(null, file.fieldname+"_" +Date.now() + path.extname(file.originalname));
  }
 })
let upload = multer({
  storage:storage
})
//let cpUploads = upload.fields([{name:'file', maxCount:1}, {name:file, maxCount:20}])

uploadrouter.post("/img/upload", upload.array('file', 12), FilesUploadsController.Uploads )
uploadrouter.get("/updates/:fileId", FilesUploadsController.findAndUpdateId);
uploadrouter.put('/update/:fileId', upload.single('file'), FilesUploadsController.UpdateImages);
uploadrouter.delete('/remove/:fileId', FilesUploadsController.DeleteImages);
uploadrouter.get("/test", FilesUploadsController.UploadsTest);

export default uploadrouter;