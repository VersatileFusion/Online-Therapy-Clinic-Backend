const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user.model");

const Client = sequelize.define("Client", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: false,
  },
  emergencyContact: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  currentMedications: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  preferredLanguage: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "en",
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "pending"),
    defaultValue: "pending",
  },
  lastAssessmentDate: {
    type: DataTypes.DATE,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Define association
Client.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Client, { foreignKey: "userId" });

module.exports = Client;
