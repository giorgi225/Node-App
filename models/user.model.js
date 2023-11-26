import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  email_verification_token: {
    type: String,
    required: true,
    default: 'false',
  },
  password: {
    type: String,
    required: false, // if OAuth dont need password
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  country: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
