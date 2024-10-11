const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const validate = require("../middleware/validate-middleware");
const { LoginSchema, signupSchema } = require("../validators/auth-validators");

// Defining Routes
router.route("/register").post(validate(signupSchema), authController.Register);
router.route("/login").post(validate(LoginSchema), authController.Login);
router.route("/user").get(authController.getCurrentUser);

module.exports = router;
