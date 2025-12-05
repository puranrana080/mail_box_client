import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  handleSendMail,
  getInboxMails,
  markMailAsRead,
} from "../controllers/mail.js";
const router = express.Router();

router.post("/sendMail", authenticate, handleSendMail);

router.get("/inboxMail", authenticate, getInboxMails);

router.patch("/mark-read/:mailId", authenticate, markMailAsRead);

export default router;
