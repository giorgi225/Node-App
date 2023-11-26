import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import {
  refreshTokenCreateSave,
  tokenCreateSave,
} from "../utils/authTokens.js";
import passport from "passport"

class AuthController {
  static async register(req, res) {
    try {
      const { name, lastname, email, password } = req.body;
      const userExsists = await User.findOne({ email });
      if (userExsists) {
        return res.status(200).json({
          success: false,
          msg: "Email already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        lastname,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      // function creates token & refresh token, save in cookies and sending response succes
      tokenCreateSave(newUser, res);
      refreshTokenCreateSave(newUser, res);
      res.status(201).json({
        success: true,
        message: "Registered Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({
          errors: [
            { success: false, path: "email", msg: "Invalid credentials" },
          ],
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(200).json({
          errors: [
            { success: false, path: "email", msg: "Invalid credentials" },
          ],
        });
      }

      tokenCreateSave(user, res);
      refreshTokenCreateSave(user, res);
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async logout(req, res) {
    try {
      res.clearCookie("token");
      res.clearCookie("refresh-token");
      req.logout();
      res.status(200).json({ success: true, msg: "Logout successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static Google() {
    return passport.authenticate("google", { scope: ["profile", "email"] });
  }
  static GoogleCallback() {
    return passport.authenticate("google", {
      successRedirect: "/api/user",
      failureRedirect: "/api/auth/google/error",
    });
  }
}

export default AuthController;
