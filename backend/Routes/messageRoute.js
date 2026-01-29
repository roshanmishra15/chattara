import express from 'express'
import { sendMessage, getMessage } from '../Controllers/messageController.js';
import { isAuthenticated } from '../Middleware/isAuthenticated.js'
const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage)
router.route("/:id").get(isAuthenticated, getMessage)
export default router;
