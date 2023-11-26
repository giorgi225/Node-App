import mongoose from "mongoose";
import databaseConfig from "../config/database.config.js";
import User from "../models/user.model.js";

class Database {
  static async connect() {
    try {
      await mongoose.connect(databaseConfig.uri).then(() => {
        console.log("Connected to MongoDB");
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async testUser() {
    try {
      await User.create({
        name: "admin",
        lastname: "admin",
        email: "admin@admin.com",
        email_verified: true,
        password: "Admin123",
        country: "Georgia",
        phone: "574-17-51-88",
      });
      console.log("Test user seeded");
    } catch (err) {
      console.log(err);
    }
  }
}
export default Database;
