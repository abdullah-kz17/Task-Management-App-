const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  if (!token.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid token format" });
  }
  const jwtToken = token.replace("Bearer ", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("Token Verified:", isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userData;
    req.token = jwtToken;
    req.ID = userData._id;

    next();

    console.log("User AUTHENTICATION TOKEN", token);
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
