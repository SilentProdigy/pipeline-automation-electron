// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create an Express application
const app = express();
const port = 3001;

// Configure MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pipeline_automation'
});

// Connect to MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(cors());

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Define the registration endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Insert user data into the database
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user data into the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
