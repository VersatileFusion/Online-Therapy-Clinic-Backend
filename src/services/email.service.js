const nodemailer = require("nodemailer");
const logger = require("../utils/logger");
const { AppError } = require("../middleware/error.middleware");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options) {
    try {
      logger.info("Sending email:", {
        to: options.to,
        subject: options.subject,
      });

      const mailOptions = {
        from: `"Online Therapy Clinic" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info("Email sent successfully:", info.messageId);

      return info;
    } catch (error) {
      logger.error("Failed to send email:", error);
      throw new AppError("Failed to send email", 500);
    }
  }

  async sendWelcomeEmail(user) {
    const subject = "Welcome to Online Therapy Clinic";
    const html = `
      <h1>Welcome ${user.firstName}!</h1>
      <p>Thank you for joining our online therapy platform.</p>
      <p>We're here to support you on your journey to better mental health.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  async sendAppointmentConfirmation(appointment, user) {
    const subject = "Appointment Confirmation";
    const html = `
      <h1>Appointment Confirmed</h1>
      <p>Dear ${user.firstName},</p>
      <p>Your appointment has been scheduled for ${new Date(
        appointment.startTime
      ).toLocaleString()}.</p>
      <p>Meeting Link: ${appointment.meetingLink}</p>
      <p>Please join 5 minutes before the scheduled time.</p>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  async sendAssessmentCompleteNotification(assessment, user) {
    const subject = "Initial Assessment Complete";
    const html = `
      <h1>Assessment Complete</h1>
      <p>Dear ${user.firstName},</p>
      <p>Thank you for completing your initial assessment.</p>
      <p>Our team will review your assessment and contact you within 24 hours to discuss the next steps.</p>
      <p>If you have any urgent concerns, please contact us immediately.</p>
    `;

    return this.sendEmail({
      to: user.email,
      subject,
      html,
    });
  }

  async sendTherapistAssignmentNotification(assessment, therapist, client) {
    const subject = "Therapist Assignment";
    const html = `
      <h1>Therapist Assigned</h1>
      <p>Dear ${client.firstName},</p>
      <p>We have assigned ${therapist.firstName} ${therapist.lastName} as your therapist.</p>
      <p>You will receive a separate email with instructions for scheduling your first session.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
    `;

    return this.sendEmail({
      to: client.email,
      subject,
      html,
    });
  }
}

module.exports = new EmailService();
