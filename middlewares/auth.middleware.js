import express from "express";
import "dotenv/config.js";
import { body, validationResult } from "express-validator";
import Regex from "../utils/regex.utiil.js";



class AuthMiddleware {
  constructor(rules) {
    this.rules = rules;
  }

  validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  }

  getMiddleware() {
    return [this.rules, this.validateRequest];
  }
}

const registerRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()

    .isString()
    .custom((value) => Regex.isMultilingualAlpha(value))
    .withMessage("Please enter valid name"),
  body("lastname")
    .notEmpty()
    .withMessage("Lastname is required")
    .bail()

    .isString()
    .custom((value) => Regex.isMultilingualAlpha(value))
    .withMessage("Please enter valid lastname"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()

    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("password_confirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .bail()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password confirmation does not match password"),
];
const loginRules = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

const registerMiddleware = new AuthMiddleware(registerRules).getMiddleware();
const loginMiddeware = new AuthMiddleware(loginRules).getMiddleware();
export { registerMiddleware, loginMiddeware };
export default AuthMiddleware;
