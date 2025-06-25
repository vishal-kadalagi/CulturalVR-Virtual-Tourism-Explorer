const express = require('express');
const router = express.Router();
const db = require('../db');

// Add place
router.post('/add', (req, res) => {
  const { name, type, url } = req.body;
  db.query('INSERT INTO places SET ?', { name, type, url }, (err) => {
    if (err) return res.status(500).send(err);
    res.send('Place added');
  });
});

// Get all places
router.get('/places', (req, res) => {
  db.query('SELECT * FROM places', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
