const express = require('express');
const db = require('./database');
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
    <h2>Please use /status to verify the connection to the API and database</h2>
    <br> 
    <img src="/logo.png" alt="Logo" style="width: 500px; height: 500px; display: block; margin: 0 auto;" /> 
  `);
  if (db.config.host === 'localhost') {
    console.log("[INFO] " + db.config.host + " is connected to the API");
  }
  else {
    console.error("[ERROR] " + db.config.host + " is not connected to the API");
  }
});

// Verify the connection to the API and database 
app.get('/status', (req, res, next) => {
  db.query('SELECT 1', (err, result) => {
    if (err) {
      res.send('--- API Status ---' + '<br>' + ' - Database connection ERROR' + '<br>' + ' - ' + db.config.host + ' connection OK' + '<br>' + "Please check the database connection : 'sudo service mysql status' or 'sudo service mysql start'");
      console.error("[ERROR] Impossible to connect to the database: " + db.config.database + '\n' + ' - ' + err + '\n' + ' - Please check the database connection : "sudo service mysql status" or "sudo service mysql start"');
      return;}
    res.send('--- API Status ---' + '<br>' + ' - Database connection OK' + '<br>' + ' - ' + db.config.host + ' connection OK' + '<br>' + "Result: " + result);
    console.log('[INFO] API Status :' + '\n - Database connection OK' + '\n - ' + db.config.host + ' connection OK' + "\n - Result: " + result);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[ERROR] " + err); // Log the error to the console
  res.status(500).send('Something went wrong!'); // Send a 500 Internal Server Error response
});

// Start the server (listen for requests)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`--- Server is running on port ${port} ---`);
});