import mongoose, { Schema, model} from "mongoose";

// Schema
const userSchema = new Schema({
  userName : {
    type: String,
    required: true,
  },
  email : {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password : {
    type: String,
    required: true
  }
},{timestamps: true})


// model
export const User = mongoose.models.User || model('User', userSchema)