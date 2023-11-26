import express from "express";
import AuthMiddleware, {
  registerMiddleware,
  loginMiddeware,
} from "../middlewares/auth.middleware.js";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

// Custom 
router.post("/register", [registerMiddleware], AuthController.register);
router.post("/login", [loginMiddeware], AuthController.login);
// OAuth
router.get("/google", AuthController.Google());
router.get("/google/callback", AuthController.GoogleCallback());

// Logout
router.post("/logout", AuthController.logout);


export default router;
