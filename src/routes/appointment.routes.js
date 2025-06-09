const express = require('express');
const router = express.Router();

// Example: Get all appointments
router.get('/', (req, res) => {
  res.json({ message: 'List of appointments' });
});

module.exports = router;
