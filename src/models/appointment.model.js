const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Therapist = require("./therapist.model");
const Client = require("./client.model");

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  therapistId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Therapist,
      key: "id",
    },
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Client,
      key: "id",
    },
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("scheduled", "completed", "cancelled", "no-show"),
    defaultValue: "scheduled",
  },
  type: {
    type: DataTypes.ENUM("initial", "follow-up", "emergency"),
    allowNull: false,
  },
  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "completed", "refunded"),
    defaultValue: "pending",
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  sessionNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Define associations
Appointment.belongsTo(Therapist, { foreignKey: "therapistId" });
Appointment.belongsTo(Client, { foreignKey: "clientId" });

Therapist.hasMany(Appointment, { foreignKey: "therapistId" });
Client.hasMany(Appointment, { foreignKey: "clientId" });

module.exports = Appointment;
