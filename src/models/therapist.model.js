const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user.model");

const Therapist = sequelize.define("Therapist", {
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
  specialization: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  education: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  availability: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  languages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  certifications: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
  },
  totalSessions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Define association
Therapist.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Therapist, { foreignKey: "userId" });

module.exports = Therapist;
