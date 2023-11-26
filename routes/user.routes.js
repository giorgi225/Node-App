import express from "express";
import UserMiddleware from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/", UserMiddleware.Authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
