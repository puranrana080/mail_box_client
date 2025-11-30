import express from "express"
import { login, register } from "../controllers/user.js"
const router  = express.Router()

router.post('/user/register',register)
router.post('/user/login',login)



export default router