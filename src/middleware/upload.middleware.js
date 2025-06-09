const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { AppError } = require("./error.middleware");
const logger = require("../utils/logger");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed.",
        400
      ),
      false
    );
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5, // Maximum 5 files
  },
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    logger.error("Multer error:", err);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "error",
        message: "File size too large. Maximum size is 5MB.",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        status: "error",
        message: "Too many files. Maximum 5 files allowed.",
      });
    }
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
  next(err);
};

module.exports = {
  upload,
  handleMulterError,
};
