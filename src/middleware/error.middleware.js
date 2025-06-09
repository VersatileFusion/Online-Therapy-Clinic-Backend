const logger = require("../utils/logger");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleSequelizeError = (err) => {
  if (err.name === "SequelizeValidationError") {
    return new AppError(err.errors.map((e) => e.message).join(", "), 400);
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    return new AppError("Duplicate field value entered", 400);
  }
  return err;
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", 401);

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error
  logger.error("Error:", {
    error: err,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    user: req.user?.id,
  });

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production mode
    let error = { ...err };
    error.message = err.message;

    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      error = handleSequelizeError(err);
    }
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      // Programming or unknown errors
      logger.error("Unexpected error:", error);
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};

module.exports = {
  AppError,
  errorHandler,
};
