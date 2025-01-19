import { Logger } from "../config/logger.mjs";

const errorMiddleware = (err, req, res, next) => {
  // Log the error for debugging (you can use a logger like winston or morgan)
  Logger.error(err.message);
  console.error(err.stack);

  // Handle different types of errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: err.message,
      errors: err.errors, // Validation details if needed
    });
  }

  // Handle MongoDB validation or other database errors
  if (err.name === "MongoError") {
    return res.status(500).json({
      status: "error",
      message: "Database error occurred",
    });
  }

  // Handle internal server errors
  if (err.status >= 500) {
    return res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }

  // Default error handler (for unexpected errors)
  return res.status(500).json({
    status: "error",
    message: err.message || "Something went wrong!",
  });
};

export default errorMiddleware;
