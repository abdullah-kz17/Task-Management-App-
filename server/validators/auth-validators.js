const { z } = require("zod");

// Login validation Schema
const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .max(255, "Maximum 255 characters are required for email")
    .min(3, "Minimum 3 characters are required for email"),
  password: z
    .string({ required_error: "Password is required" })
    .max(255, "Maximum 255 characters are required for password")
    .min(7, "Minimum 7 characters are required for password"),
});

// Define the signup schema by extending the login schema
const signupSchema = LoginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "At least 3 characters are required for name" })
    .max(255, { message: "Name cannot be more than 255 characters" }),
});

module.exports = { signupSchema, LoginSchema };
