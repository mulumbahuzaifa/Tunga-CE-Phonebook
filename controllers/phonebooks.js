const phoneBooksRouter = require('express').Router()
const PhoneBook = require('../models/phonebook')

phoneBooksRouter.get('/', (request, response) => {
  PhoneBook.find({}).then(phoneBooks => {
    response.send(phoneBooks)
  })
})

phoneBooksRouter.get('/:id', (request, response, next) => {
  PhoneBook.findById(request.params.id)
    .then(phoneBook => {
      if (phoneBook) {
        response.json(phoneBook)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

phoneBooksRouter.post('/', (request, response, next) => {
    const { name, number } = request.body;

    // Check if name or number is missing
    if (!name || !number) {
      return response.status(400).json({ error: 'Name and number are required' });
    }
  
    // Generate a custom ID for the new entry
    const customId = Math.floor(Math.random() * 1e6).toString();
  
    // Create a new phonebook entry with custom ID
    const phoneBook = new PhoneBook({
      id: customId,
      name,
      number,
    });
  
    // Save entry to the database
    phoneBook
      .save()
      .then(savedPhoneBook => {
        response.json(savedPhoneBook);
      })
      .catch(error => {
        if (error.name === 'MongoServerError' && error.code === 11000) {
          response.status(400).json({ error: 'Name must be unique' });
        } else {
          next(error);
        }
      });
})

phoneBooksRouter.delete('/:id', (request, response, next) => {
  PhoneBook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

phoneBooksRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const phoneBook = {
    name: body.name,
    number: body.number,
  }

  PhoneBook.findByIdAndUpdate(request.params.id, phoneBook, { new: true })
    .then(updatedPhoneBook => {
      response.json(updatedPhoneBook)
    })
    .catch(error => next(error))
})

module.exports = phoneBooksRouter