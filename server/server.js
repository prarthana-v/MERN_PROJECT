const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

let dbConnected = false;
let dbConnecting = false;

const startDB = async () => {
  dbConnecting = true;
  try {
    await connectDB();
    dbConnected = true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message || error);
  } finally {
    dbConnecting = false;
  }
};

// Load env vars
dotenv.config();

// Connect to Mongo
startDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Local Vite development
  'http://localhost:3000', // Local development (alternative)
  'https://lumiere-beauty.vercel.app', // Deployed frontend URL
  'https://your-frontend-project-name.vercel.app' // Add any other Vercel preview URLs if needed
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Important if you use cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use((req, res, next) => {
  if (!dbConnected) {
    return res.status(503).json({
      message: dbConnecting
        ? 'Database is still connecting, please retry in a moment.'
        : 'Service unavailable - database connection not established.'
    });
  }
  next();
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));

// Admin Stats Route (mapped to same controller for simplicity or separate it)
app.use('/api/admin', require('./routes/orderRoutes')); 

// Serve Uploads Static Folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;