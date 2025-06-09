const express = require('express');
const router = express.Router();

// Example: Login route
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

// Example: Register route
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint' });
});

module.exports = router; 