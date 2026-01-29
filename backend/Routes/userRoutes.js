import express from 'express'
import { register,login,logout, getOtherUsers } from '../Controllers/userController.js';
import { isAuthenticated } from '../Middleware/isAuthenticated.js';
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,getOtherUsers);

export default router;