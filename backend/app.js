const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();  

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, '../src')));

// Middleware
app.use(express.json());

// Routes (endpoints)
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the KanbanFlow API</h1>
    <h2>Please use <a href="http://localhost:5000/status">/status</a> to verify the connection to the API</h2>
    <br>
    <img src="/logo.png" alt="Logo" style="width: 500px; height: 500px; display: block; margin: 0 auto;" /> 
  `);
});

// Status route
app.get('/status', (req, res) => {
  res.send(`
    <h1>Server is running</h1>
    <h2>API is ready to use</h2>
  `);
});

// Session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// CROS (Cross-Origin Resource Sharing) middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API routes
app.use('/users', require('./routes/users'));
app.use('/boards', require('./routes/boards'));
app.use('/tasks', require('./routes/tasks'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[ERROR] " + err); // Log the error to the console
  res.status(500).send('Something went wrong!'); // Send a 500 Internal Server Error response
});

// Start the server (listen for requests)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`\n--- Server is running on port ${port} ---`);
});