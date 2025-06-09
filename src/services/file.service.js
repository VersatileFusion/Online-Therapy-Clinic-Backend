const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");
const { AppError } = require("../middleware/error.middleware");

class FileService {
  constructor() {
    this.uploadDir = process.env.UPLOAD_DIR || "uploads";
    this.maxFileSize = process.env.MAX_FILE_SIZE || 5 * 1024 * 1024; // 5MB
  }

  async initialize() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      logger.info("Upload directory initialized");
    } catch (error) {
      logger.error("Failed to initialize upload directory:", error);
      throw new AppError("Failed to initialize file system", 500);
    }
  }

  async saveFile(file, directory = "") {
    try {
      const uploadPath = path.join(this.uploadDir, directory);
      await fs.mkdir(uploadPath, { recursive: true });

      const fileName = `${uuidv4()}-${file.originalname}`;
      const filePath = path.join(uploadPath, fileName);

      await fs.writeFile(filePath, file.buffer);
      logger.info("File saved successfully:", { fileName, directory });

      return {
        fileName,
        filePath,
        size: file.size,
        mimetype: file.mimetype,
      };
    } catch (error) {
      logger.error("Failed to save file:", error);
      throw new AppError("Failed to save file", 500);
    }
  }

  async deleteFile(filePath) {
    try {
      const fullPath = path.join(this.uploadDir, filePath);
      await fs.unlink(fullPath);
      logger.info("File deleted successfully:", filePath);
    } catch (error) {
      logger.error("Failed to delete file:", error);
      throw new AppError("Failed to delete file", 500);
    }
  }

  async getFileInfo(filePath) {
    try {
      const fullPath = path.join(this.uploadDir, filePath);
      const stats = await fs.stat(fullPath);

      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
      };
    } catch (error) {
      logger.error("Failed to get file info:", error);
      throw new AppError("Failed to get file information", 500);
    }
  }

  async listFiles(directory = "") {
    try {
      const dirPath = path.join(this.uploadDir, directory);
      const files = await fs.readdir(dirPath);

      const fileList = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(dirPath, file);
          const stats = await fs.stat(filePath);

          return {
            name: file,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
          };
        })
      );

      logger.info("Files listed successfully:", {
        directory,
        count: fileList.length,
      });
      return fileList;
    } catch (error) {
      logger.error("Failed to list files:", error);
      throw new AppError("Failed to list files", 500);
    }
  }

  validateFile(file) {
    if (file.size > this.maxFileSize) {
      throw new AppError(
        `File size exceeds maximum limit of ${
          this.maxFileSize / 1024 / 1024
        }MB`,
        400
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new AppError("Invalid file type", 400);
    }
  }
}

module.exports = new FileService();
