const express = require('express');
require('dotenv').config();
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Serve static files from the frontend build if present, otherwise fallback to src
const buildPath = path.join(__dirname, '../frontend/build');
const staticPath = require('fs').existsSync(buildPath) ? buildPath : path.join(__dirname, '../src');

app.use(express.static(staticPath));

// Basic security and parsing middleware
app.use(helmet());
app.use(express.json());

// Rate limiter to mitigate brute-force and DOS
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

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
const sessionSecret = process.env.SESSION_SECRET || 'dev-secret-change-me';
app.set('trust proxy', 1);
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
}));

// CORS configuration: whitelist an origin or use env var
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use('/users', require('./routes/users'));
app.use('/boards', require('./routes/boards'));
app.use('/tasks', require('./routes/tasks'));

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(`[ERROR] ${err}`); // Log the error to the console
  res.status(500).send('Something went wrong!'); // Send a 500 Internal Server Error response
});

// Start the server (listen for requests)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`--- Server is running on port ${port} ---`);
});
