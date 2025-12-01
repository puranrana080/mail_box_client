import express from "express"
import { authenticate } from "../middleware/auth.js";
import { handleSendMail } from "../controllers/mail.js";
const router  = express.Router()


router.post('/sendMail',authenticate,handleSendMail)


export default router;