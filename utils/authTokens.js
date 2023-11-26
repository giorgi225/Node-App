import "dotenv/config";
import JWT from "./jwt.utils.js";

const {
  SECRET_TOKEN,
  SECRET_REFRESH_TOKEN,
  SECRET_TOKEN_EXPIRATION,
  SECRET_REFRESH_TOKEN_EXPIRATION,
} = process.env;

const tokenCreateSave = (user, res) => {
  const token = JWT.sign(user._id, SECRET_TOKEN, SECRET_TOKEN_EXPIRATION);
  res.cookie("token", token, {
    httpOnly: true,
  });
};

const refreshTokenCreateSave = (user, res) => {
  const refreshToken = JWT.sign(
    user._id,
    SECRET_REFRESH_TOKEN,
    SECRET_REFRESH_TOKEN_EXPIRATION
  );
  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
  });
};

export {refreshTokenCreateSave, tokenCreateSave}
