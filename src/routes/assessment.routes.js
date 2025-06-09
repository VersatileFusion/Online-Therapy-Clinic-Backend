const express = require("express");
const router = express.Router();

// Example: Get all assessments
router.get("/", (req, res) => {
  res.json({ message: "List of assessments" });
});

module.exports = router;
