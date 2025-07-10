require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const scoreRoutes = require('./routes/scores');
const passport = require('passport');
require('./config/passport'); 
const session = require('express-session');

const app = express();
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Session (for Google OAuth)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/auth', require('./routes/googleAuth')); 

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
