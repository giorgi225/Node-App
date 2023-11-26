import express from "express";
import Email from "../utils/email.utils.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import VerificationController from "../controllers/verify.controller.js";
const router = express.Router();

router.get("/send-email", UserMiddleware.Authenticate, async (req, res) => {
  try {
    if (req.user) {
      await Email.sendEmailVerification(req.user);
      res.status(200).json({
        success: true,
        msg: "Verification email sended successfully, check your email please",
      });
    } else {
      res.status(200).json({
        success: false,
        msg: "Login first please",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Server Internal Error",
    });
  }
});

router.get("/email/:token", VerificationController.VerifyEmailVerification);
export default router;
