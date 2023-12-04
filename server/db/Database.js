import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv("env");

const mongoDb =async()=>{
  let MongodbUrl = process.env.MONGODB_URL;
  let OPTION = {
    dbname:"uploadtest"
  }

   let connect= await mongoose.connect(MongodbUrl, OPTION)
        .then((res)=> {
          console.log("DataBase Connected...")
        }).catch((error)=> {
          console.log(error)
        })
}

export default mongoDb