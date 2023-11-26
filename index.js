import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./utils/passport.utils.js";
import "dotenv/config.js";
// Routes
import AuthRoutes from "./routes/auth.routes.js";
import UserRoutes from "./routes/user.routes.js";
import VerifyRoutes from "./routes/verify.routes.js";
// Utils
import App from "./utils/runApp.js";

const app = express();
app.use(express.json());
 // For Oauth
app.use(
  session({
    secret: process.env["SESSION_SECRET"],
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
 // End For Oauth


app.use(cookieParser());
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/verify", VerifyRoutes);
App.run(app);
