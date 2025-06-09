const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Client = require("./client.model");

const Assessment = sequelize.define("Assessment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Client,
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("in-progress", "completed", "reviewed"),
    defaultValue: "in-progress",
  },
  chatHistory: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
  initialConcerns: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  symptoms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  severity: {
    type: DataTypes.ENUM("mild", "moderate", "severe"),
    allowNull: true,
  },
  recommendedTherapistTypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  aiAnalysis: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  assignedTherapistId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  completionDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  reviewDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high", "urgent"),
    defaultValue: "medium",
  },
});

// Define association
Assessment.belongsTo(Client, { foreignKey: "clientId" });
Client.hasMany(Assessment, { foreignKey: "clientId" });

module.exports = Assessment;
