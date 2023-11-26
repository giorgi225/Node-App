import User from "../models/user.model.js";
import JWT from "../utils/jwt.utils.js";

class VerificationController {
  static async VerifyEmailVerification(req, res) {
    const { token } = req.params;

    try {
      const decodeToken = JWT.verify(token, "EMAIL_VERIFCATION_SECRET_TOKEN");
      console.log("Decoded token:", decodeToken);

      if (!decodeToken) {
        return res.status(400).json({
          message: "Invalid token format",
        });
      }

      const user = await User.findOne({ email_verification_token: token });

      if (!user) {
        return res.status(404).json({
          message: "Invalid verification token",
        });
      }

      user.email_verification_token = "verified";
      user.email_verified = true;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Verified Successfully",
      });
    } catch (err) {
      console.error("Error during email verification:", err);

      if (err.name === "TokenExpiredError") {
        return res.status(200).json({
          message: "Email verification token has expired",
        });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(200).json({
          message: "Invalid token",
        });
      }

      res.status(500).json({
        message: "Internal server error.",
      });
    }
  }
}

export default VerificationController;
