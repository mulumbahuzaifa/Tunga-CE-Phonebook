const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const phoneBooksRouter = require('./controllers/phonebooks')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan');
const PhoneBook = require('./models/phonebook');

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
// Create a custom Morgan token to log POST data
morgan.token('postData', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
  });
  
  // Set up Morgan with custom token in the log format
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :postData')
  );
app.use(middleware.requestLogger)

app.use('/api/persons', phoneBooksRouter)
// /info route
app.get('/info', (request, response, next) => {
    PhoneBook.countDocuments({})
      .then(count => {
        const currentTime = new Date();
        response.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${currentTime}</p>
        `);
      })
      .catch(error => next(error));
  });

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app