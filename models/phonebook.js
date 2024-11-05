const mongoose = require('mongoose')

const PhoneBookSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true, // Ensure custom ID is unique
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true, // Enforce unique names
    },
    number: {
        type: String,
        required: [true, 'Number is required'],
    }
},{ timestamps: true })

// PhoneBookSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })
PhoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

module.exports = mongoose.model('PhoneBook', PhoneBookSchema)