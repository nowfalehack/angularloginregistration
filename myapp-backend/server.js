const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'angular_test'
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error('MySQL Error:', err);
        return res.status(500).json({ success: false, message: 'Registration failed' });
      }
      res.json({ success: true, message: 'User registered' });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Login failed' });
      }

      if (results.length > 0) {
        // ✅ send full user data including 'name'
        const user = results[0];
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }
  );
});

app.listen(4000, () => {
  console.log('🚀 Server running on http://localhost:4000');
});
