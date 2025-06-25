const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Main async function to start server after DB connection
async function startServer() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vrplayer',
  });
  console.log('Connected to MySQL');

  // Routes
  app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
      res.json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ message: 'Register failed' });
    }
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const [data] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
      if (data.length === 0) return res.status(401).json({ message: 'Invalid login' });
      res.json({ message: 'User login success', user: data[0] });
    } catch (err) {
      res.status(500).json({ message: 'Login error' });
    }
  });

  app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const [data] = await db.execute('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
      if (data.length === 0) return res.status(401).json({ message: 'Invalid admin login' });
      res.json({ message: 'Admin login success', admin: data[0] });
    } catch (err) {
      res.status(500).json({ message: 'Admin login error' });
    }
  });

  app.post('/api/places', async (req, res) => {
    const { name, description } = req.body;
    try {
      await db.execute('INSERT INTO places (name, description) VALUES (?, ?)', [name, description]);
      res.json({ message: 'Place added' });
    } catch (err) {
      res.status(500).json({ message: 'Place not added' });
    }
  });

  app.get('/api/places/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [placeRows] = await db.execute('SELECT * FROM places WHERE id = ?', [id]);
      if (placeRows.length === 0) return res.status(404).json({ message: 'Place not found' });

      const [mediaRows] = await db.execute('SELECT * FROM media WHERE place_id = ?', [id]); // fixed column for place_id

      const place = placeRows[0];
      place.media = mediaRows;

      res.json(place);
    } catch (err) {
      console.error('Error loading place:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  app.post('/api/upload', upload.single('file'), async (req, res) => {
    const { place_id, type } = req.body;
    const filename = req.file.filename;
    try {
      await db.execute('INSERT INTO media (place_id, type, filename) VALUES (?, ?, ?)', [place_id, type, filename]);
      res.json({ message: 'Media uploaded', filename });
    } catch (err) {
      res.status(500).json({ message: 'Media upload failed' });
    }
  });

  app.get('/api/places', async (req, res) => {
    try {
      const [places] = await db.execute('SELECT * FROM places');

      const placeMediaPromises = places.map(async place => {
        const [media] = await db.execute('SELECT * FROM media WHERE place_id = ?', [place.id]);
        return { ...place, media };
      });

      const result = await Promise.all(placeMediaPromises);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch places or media' });
    }
  });

  // Start server after DB connection and route setup
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Call the function
startServer().catch(err => {
  console.error('Failed to start server:', err.message);
});
