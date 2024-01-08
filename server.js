// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


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

// Define the login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  // Query the database to find the user with the provided credentials
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying the database for login:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if the user with the provided credentials exists
    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      console.log('User logged in successfully');
      res.status(200).json({ message: 'User logged in successfully' });
    }
  });
});

app.get('/download', async (req, res) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3005/download', // URL of the file on Linux server
      responseType: 'stream',
    });

    res.setHeader('Content-Disposition', 'attachment; filename=file.ext'); // Set the filename
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while downloading the file');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

