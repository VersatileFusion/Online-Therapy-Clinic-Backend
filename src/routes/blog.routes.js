const express = require("express");
const router = express.Router();

// Example: Get all blog posts
router.get("/", (req, res) => {
  res.json({ message: "List of blog posts" });
});

module.exports = router;
