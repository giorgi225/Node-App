import jwt from "jsonwebtoken";
class JWT {
  static sign(id, token, expiration) {
    const tokenPayload = { user_id: id };
    const tokenExpiration = { expiresIn: expiration };
    const secretToken = jwt.sign(tokenPayload, token, tokenExpiration);
    return secretToken;
  }
  static verify(token, secretToken) {
    return jwt.verify(token, secretToken)
  }
}
export default JWT