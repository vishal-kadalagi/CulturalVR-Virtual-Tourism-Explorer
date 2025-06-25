const express = require('express');
const router = express.Router();
const db = require('../db');

// User registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users SET ?', { username, password }, (err) => {
    if (err) return res.status(500).send(err);
    res.send('User registered');
  });
});

// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) res.json({ success: true });
    else res.status(401).json({ success: false });
  });
});

// Admin login
router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM admins WHERE username=? AND password=?', [username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) res.json({ success: true });
    else res.status(401).json({ success: false });
  });
});

module.exports = router;
