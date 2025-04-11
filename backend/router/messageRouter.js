import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import {isAdminAuthenticate} from "../middlewares/auth.js"

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticate, getAllMessages);

export default router;