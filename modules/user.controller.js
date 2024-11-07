import { User } from "./../../db/models/user.model.js";
import { asyncHandler } from "./../utils/asyncHandler.js";
import bcryptjs from 'bcryptjs'
import { Token } from './../../db/models/token.model.js'
import jwt from 'jsonwebtoken'


// register
export const register = asyncHandler(async (req, res, next) => {
  // data from request 
  const {userName, role, email, password} = req.body
  // check user existence 
  const isUser = await User.findOne({email})
  if(isUser) return next(new Error('Email Is Already Registered', {cause: 409}))
  // hash password
  const hashPassword  = bcryptjs.hashSync(password, Number(process.env.SALT_ROUND))
  const user = await User.create({userName, role ,email, password: hashPassword})

  // send response
  return res.json({success: true, message: "email created successfully"})
})


// login
export const login = asyncHandler(async (req, res, next)=> {
  // data from request 
  const { email, password } = req.body

  // check user existense
  const user = await User.findOne({ email })
  if (!user) return next(new Error("invalid Email"), { cause: 400 })

  // check password
  const match = bcryptjs.compareSync(password, user.password)
  if (!match) return next(new Error('invalid password',{ cause : 400}))
  
  // generate token 
  const token = jwt.sign(
    { id: user._id, email: user.email }, process.env.TOKEN_KEY, {
      expiresIn: '2d',
    })

  // save token in token model 
  await Token.create({
    token, 
    user: user._id, 
    agent: req.headers['user-agent']
  })

  // send response 
  return res.json({ success: true, results: token})
})
