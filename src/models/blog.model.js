const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user.model");

const Blog = sequelize.define("Blog", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  featuredImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("draft", "published", "archived"),
    defaultValue: "draft",
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  metaTitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  seoKeywords: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "en",
  },
  translations: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Define association
Blog.belongsTo(User, { foreignKey: "authorId", as: "author" });
User.hasMany(Blog, { foreignKey: "authorId" });

module.exports = Blog;
