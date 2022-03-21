const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/animes', require('./controllers/animes'));
app.use('/api/v1/books', require('./controllers/books'));
app.use('/api/v1/foods', require('./controllers/foods'));
app.use('/api/v1/drinks', require('./controllers/drinks'));
// app.use('/api/v1/shoes', require('./controllers/shoes'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
