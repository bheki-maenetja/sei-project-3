const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const embeddedUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  organizer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  countries: [{ type: String, required: true }],
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  budget: [{ type: String, required: true }],
  participants: [ embeddedUserSchema ],
  interested: [ embeddedUserSchema ],
  likes: [ embeddedUserSchema ],
  comments: [ commentSchema ]
})

tripSchema.pre('validate', function checkArrays(next) {
  if (this.countries.length === 0) {
    this.invalidate('countries', 'Please select at least 1 destination')
  } 

  if (this.budget.length === 0) {
    this.invalidate('budget', 'Please specify at least one budget')
  }
  
  next()
})

module.exports = mongoose.model('Trip', tripSchema)