require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { sequelize } = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const i18next = require("i18next");
const i18nextMiddleware = require('i18next-http-middleware');
const i18nextBackend = require("i18next-fs-backend");
const logger = require("./utils/logger");

// Initialize Express app
const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Therapy Clinic API",
      version: "1.0.0",
      description: "API documentation for Online Therapy Clinic",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// i18next configuration
i18next.use(i18nextBackend).init({
  backend: {
    loadPath: "./locales/{{lng}}/{{ns}}.json",
  },
  fallbackLng: "en",
  preload: ["en", "fa"],
  ns: ["common"],
  defaultNS: "common",
});

app.use(i18nextMiddleware.handle(i18next));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/therapists", require("./routes/therapist.routes"));
app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/assessments", require("./routes/assessment.routes"));
app.use("/api/blog", require("./routes/blog.routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});

// Database connection and server start
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");

    // Sync database models
    await sequelize.sync({ alter: true });
    logger.info("Database models synchronized successfully.");

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(
        `Swagger documentation available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    logger.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
