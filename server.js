const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace with your actual MySQL database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pipeline_automation'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.static('registration-app/build'));

// Serve the React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pipeline-automation-electron/build', 'public/index.html'));
});

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Insert user into the database
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Registration successful' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
