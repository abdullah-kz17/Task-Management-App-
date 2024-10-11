const validate = (Schema) => async (req, res, next) => {
  try {
    // Parse and validate the request body against the provided schema
    const parsedBody = await Schema.parseAsync(req.body);
    req.body = parsedBody; // Attach the validated body to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    const status = 422; // Unprocessable Entity
    const message = "Fill the input properly"; // General message
    const extraDetails = err.errors.map((error) => error.message).join(", "); // Collect all error messages

    // Construct the error object
    const error = {
      status,
      message,
      extraDetails,
    };

    console.error("Validation Error:", error); // Log the error for debugging

    // Send the error response
    return res.status(status).json(error);
  }
};

module.exports = validate;
