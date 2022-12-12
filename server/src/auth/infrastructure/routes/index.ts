import express from "express";
const router = express.Router();
import AuthController from '../controllers'

router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);

export default router;