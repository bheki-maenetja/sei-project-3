const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  likes: [ likeSchema ]
})

categorySchema.virtual('trips-in-category', {
  ref: 'Trip',
  localField: '_id',
  foreignField: 'category'
})

categorySchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Category', categorySchema)