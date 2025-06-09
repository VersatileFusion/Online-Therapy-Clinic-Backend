const jwt = require("jsonwebtoken");
const { User } = require("../models");
const logger = require("../utils/logger");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      logger.warn("Authentication failed: No token provided");
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: { id: decoded.id, isActive: true },
    });

    if (!user) {
      logger.warn(
        `Authentication failed: User not found or inactive - ID: ${decoded.id}`
      );
      return res.status(401).json({ error: "User not found or inactive" });
    }

    req.user = user;
    req.token = token;

    logger.info(
      `User authenticated successfully - ID: ${user.id}, Role: ${user.role}`
    );
    next();
  } catch (error) {
    logger.error("Authentication error:", error);
    res.status(401).json({ error: "Please authenticate" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.warn(
        `Authorization failed: User ${req.user.id} with role ${req.user.role} attempted to access restricted resource`
      );
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = {
  auth,
  authorize,
};
