import joi from "joi";

// register

export const registerSchema = joi.object({
  userName : joi.string(),
  role : joi.string(),
  email : joi.string().email(),
  password : joi.string(),
}).required()


// login 
export const loginSchema = joi.object({
  email: joi.string().email(),
  password: joi.string(),
}).required()