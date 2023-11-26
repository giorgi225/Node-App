import User from "../models/user.model.js";
import JWT from "../utils/jwt.utils.js";
import { tokenCreateSave } from "../utils/authTokens.js";

const { SECRET_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

class UserMiddleware {
  static async Authenticate(req, res, next) {
    if (req.user) {
      req.user = req.user
      return next();
    }
    const token = req.cookies["token"];
    const refreshToken = req.cookies["refresh-token"];

    if (!token && !refreshToken) {
      res.status(200).json({
        success: false,
        msg: "Unauthorzed",
      });
    }

    try {
      const decodeToken = JWT.verify(token, SECRET_TOKEN);

      const user = await User.findById(decodeToken.user_id);

      if (!user) {
        return res.status(401).json({
          success: false,
          msg: "Unauthorized",
        });
      }

      const userData = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        email_verified: user.email_verified,
        role: user.role,
        country: user.country,
        phone: user.phone,
      };
      req.user = userData;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        try {
          const decodeRefreshToken = JWT.verify(
            refreshToken,
            SECRET_REFRESH_TOKEN
          );
          const user = await User.findById(decodeRefreshToken.user_id);
          if (!user) {
            return res.status(200).json({
              success: false,
              msg: "Unauthorized",
            });
          }
          tokenCreateSave(user, res);
          const userData = {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            email_verified: user.email_verified,
            role: user.role,
            country: user.country,
            phone: user.phone,
          };
          req.user = userData;

          next();
        } catch (err) {
          console.error(err);
          res.status(200).json({
            success: false,
            msg: "Unauthorized",
          });
        }
      }
    }
  }
}
export default UserMiddleware;
