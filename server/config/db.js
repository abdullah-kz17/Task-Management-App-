const mongoose = require("mongoose");

const connectDb = async () => {
  const URL = process.env.URL;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting database:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDb;
