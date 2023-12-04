import mongoose from "mongoose";

let ImagesSchema =new mongoose.Schema({
  fileName:[],
  image:[],
})

const ImgUploadModel = mongoose.model('imgUpload', ImagesSchema)
export default ImgUploadModel;