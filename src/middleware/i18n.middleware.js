const i18next = require("i18next");
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextBackend = require("i18next-fs-backend");
const path = require("path");
const logger = require("../utils/logger");

// Initialize i18next
i18next.use(i18nextBackend).init({
  backend: {
    loadPath: path.join(__dirname, "../../locales/{{lng}}/{{ns}}.json"),
  },
  fallbackLng: "en",
  preload: ["en", "fa"],
  ns: ["common", "errors", "validation"],
  defaultNS: "common",
  detection: {
    order: ["header", "querystring", "cookie"],
    lookupHeader: "accept-language",
    lookupQuerystring: "lang",
    lookupCookie: "language",
    caches: ["cookie"],
  },
});

// Middleware to handle language detection and switching
const languageMiddleware = (req, res, next) => {
  const lang = req.query.lang || req.headers["accept-language"] || "en";

  // Validate language
  if (!["en", "fa"].includes(lang)) {
    logger.warn(`Invalid language requested: ${lang}`);
    req.language = "en";
  } else {
    req.language = lang;
  }

  // Set language for i18next
  i18next.changeLanguage(req.language);

  logger.debug(`Language set to: ${req.language}`);
  next();
};

// Error handler for i18next
const i18nErrorHandler = (err, req, res, next) => {
  if (err.name === "i18next") {
    logger.error("i18next error:", err);
    return res.status(500).json({
      status: "error",
      message: "Translation error occurred",
    });
  }
  next(err);
};

module.exports = {
  i18next,
  i18nextMiddleware,
  languageMiddleware,
  i18nErrorHandler,
};
