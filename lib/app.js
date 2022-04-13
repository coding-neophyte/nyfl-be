const express = require('express');
const cors = require('cors');
const app = express();

// Built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// App routes
app.use(cors({
    origin: ['http://localhost:3000', 'localhost:3000', 'https://peaceful-capybara-3e8cf1.netlify.app'],
    credentials: true,
    preflightContinue: true,
    exposedHeaders: ['Set-Cookie']
  }));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use('/api/v1/users', require('./controllers/users'))
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
