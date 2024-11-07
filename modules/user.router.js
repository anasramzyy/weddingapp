import { Router } from "express";
import { isValid } from "./../middleware/vaildation.middleware.js"
import { loginSchema, registerSchema} from "./user.validation.js";
// import { isAuthenticated } from "../middleware/authentication.middleware.js";
// import { register, login} from './user.controller.js'
// import { isAuthorized } from "../middleware/authorization.middleware.js"
const router = Router()

export default router

// Register
router.post("/register", isValid(registerSchema), register)


// Login 
router.post('/login', isValid(loginSchema), login)
