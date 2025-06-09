const socketIO = require("socket.io");
const logger = require("../utils/logger");
const { AppError } = require("../middleware/error.middleware");

class NotificationService {
  constructor() {
    this.io = null;
    this.userSockets = new Map();
  }

  initialize(server) {
    this.io = socketIO(server, {
      cors: {
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      logger.info("New socket connection:", socket.id);

      socket.on("authenticate", (userId) => {
        this.userSockets.set(userId, socket.id);
        logger.info("User authenticated for notifications:", userId);
      });

      socket.on("disconnect", () => {
        for (const [userId, socketId] of this.userSockets.entries()) {
          if (socketId === socket.id) {
            this.userSockets.delete(userId);
            logger.info("User disconnected from notifications:", userId);
            break;
          }
        }
      });
    });

    logger.info("Notification service initialized");
  }

  async sendNotification(userId, notification) {
    try {
      const socketId = this.userSockets.get(userId);
      if (!socketId) {
        logger.warn("User not connected for notifications:", userId);
        return;
      }

      this.io.to(socketId).emit("notification", notification);
      logger.info("Notification sent:", { userId, type: notification.type });
    } catch (error) {
      logger.error("Failed to send notification:", error);
      throw new AppError("Failed to send notification", 500);
    }
  }

  async sendAppointmentReminder(appointment) {
    const notification = {
      type: "appointment_reminder",
      title: "Upcoming Appointment",
      message: `You have an appointment scheduled for ${new Date(
        appointment.startTime
      ).toLocaleString()}`,
      data: appointment,
    };

    await this.sendNotification(appointment.clientId, notification);
  }

  async sendAssessmentUpdate(assessment) {
    const notification = {
      type: "assessment_update",
      title: "Assessment Update",
      message: "Your assessment has been reviewed",
      data: assessment,
    };

    await this.sendNotification(assessment.clientId, notification);
  }

  async sendTherapistMessage(therapistId, clientId, message) {
    const notification = {
      type: "new_message",
      title: "New Message",
      message: `New message from ${message.sender}`,
      data: message,
    };

    await this.sendNotification(clientId, notification);
  }

  async broadcastSystemNotification(notification) {
    try {
      this.io.emit("system_notification", notification);
      logger.info("System notification broadcasted:", notification.type);
    } catch (error) {
      logger.error("Failed to broadcast system notification:", error);
      throw new AppError("Failed to broadcast notification", 500);
    }
  }

  async sendEmergencyAlert(userId, alert) {
    const notification = {
      type: "emergency_alert",
      title: "Emergency Alert",
      message: alert.message,
      data: alert,
      priority: "high",
    };

    await this.sendNotification(userId, notification);
  }
}

module.exports = new NotificationService();
