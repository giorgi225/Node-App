import "dotenv/config.js"
import passport from "passport";
import User from "../models/user.model.js";
import GoogleStrategy from "passport-google-oauth20";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your database
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          // If the user already exists, return that user
          return done(null, existingUser);
        }

        // If the user does not exist, create a new user in the database
        const newUser = new User({
          name: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          email_verified: profile.emails[0].verified,
          email_verification_token: "verified",
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
export default passport;
