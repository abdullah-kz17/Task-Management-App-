const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDb = require("./config/db");
const authRoute = require("./router/auth-router");
const projectRoute = require("./router/project-router");
const taskRoute = require("./router/task-router");
const errorMiddleware = require("./middleware/error-middleware");

const app = express();
const PORT = process.env.PORT;

// Express middleware to parse JSON requests
app.use(express.json());

// Router Middleware
app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);
app.use("/api/task", taskRoute);

// Error middleware
app.use(errorMiddleware);

// Connecting to Database
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
