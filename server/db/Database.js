import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv("env");

let username = process.env.MONGODBUSERNAME || 'yadavrjking66997';
let password = process.env.PASSWORD || 'WokfrHZDpSCfSibt';

const mongoDb =async()=>{
  let MongodbUrl = process.env.MONGODB_URL;
  let OPTION = {
    dbname:"uploadtest"
  }

   let connect= await mongoose.connect(`mongodb+srv://${username}:${password}@clustertest0.hlwuktf.mongodb.net/uploadImage?retryWrites=true&w=majority`)
        .then((res)=> {
          console.log("DataBase Connected...")
        }).catch((error)=> {
          console.log(error)
        })
}

export default mongoDb