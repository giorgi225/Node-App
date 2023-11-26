import { Resend } from "resend";
import fs from "fs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";
const { RESEND_API } = process.env;

const resend = new Resend(RESEND_API);

class Email {
  static async sendEmailVerification(user) {
    const {name, email} = user
    const emailTemplate = fs.readFileSync("email.template.html", "utf-8");
    const verificationToken = jwt.sign(
      { email: email },
      "EMAIL_VERIFCATION_SECRET_TOKEN",
      { expiresIn: "15m" }
    );
    const customEmailTemplate = emailTemplate
      .replace("{{username}}", name)
      .replace("{{email_verification_token}}", verificationToken);
    await resend.emails.send({
      from: "Node App <onboarding@resend.dev>",
      to: user.email,
      subject: "Verify Email",
      html: customEmailTemplate,
    });
    
    const currentUser = await User.findOne({email})
    currentUser.email_verification_token = verificationToken
    await currentUser.save()
  }
}

export default Email;
