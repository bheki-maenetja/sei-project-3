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

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  isPrivate: { type: Boolean, required: true },
  members: [ embeddedUserSchema ],
  likes: [ embeddedUserSchema ],
  comments: [ commentSchema ]
})

module.exports = mongoose.model('Group', groupSchema)