import mongoose from "mongoose";
export const connectDB = async ()=>{
  await mongoose.connect("mongodb://localhost:27017/weddingapp").then(()=>console.log('Db Connected')).catch(()=>console.log('something went wrong'))
}

