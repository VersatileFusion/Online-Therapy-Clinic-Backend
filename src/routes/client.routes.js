const express = require('express');
const router = express.Router();

// Example: Get all clients
router.get('/', (req, res) => {
  res.json({ message: 'List of clients' });
});

module.exports = router; 