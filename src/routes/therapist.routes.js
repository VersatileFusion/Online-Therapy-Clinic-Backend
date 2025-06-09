const express = require('express');
const router = express.Router();

// Example: Get all therapists
router.get('/', (req, res) => {
  res.json({ message: 'List of therapists' });
});

module.exports = router; 