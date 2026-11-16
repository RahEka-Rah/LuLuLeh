const session = require('express-session');

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'lomba-skala-internasional-2026', 
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 * 2, 
    secure: false 
  }
});

module.exports = sessionConfig
