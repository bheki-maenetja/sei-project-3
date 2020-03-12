const User = require('../models/userModel')

function getAllUsers(req, res, next) {
  User
    .find()
    .populate('organizedTrips')
    .populate('travel_group')
    .populate('joinedTrips')
    .populate('favoriteTrips')
    .populate('travel_groups')
    .populate('favorite_categories')
    .populate('likes.user')
    .populate('comments.user')
    .then(users => res.status(200).json(users))
    .catch(next)
}

function getUser(req, res, next) {
  User
    .findById(req.params.id)
    .populate('organizedTrips')
    .populate('travel_group')
    .populate('joinedTrips')
    .populate('favoriteTrips')
    .populate('travel_groups')
    .populate('favorite_categories')
    .populate('likes.user')
    .populate('comments.user')
    .then(user => res.status(200).json(user))
    .catch(next)
}

function profile(req, res, next) {
  // add populate to user
  User.findById(req.currentUser._id)
    .populate('organizedTrips')
    .populate('travel_group')
    .populate('joinedTrips')
    .populate('favoriteTrips')
    .populate('travel_groups')
    .populate('favorite_categories')
    .populate('likes.user')
    .populate('comments.user')
    .then(user => res.status(200).json(user))
    .catch(next)
}

function updateProfile(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => {
      if (!user) throw new Error('Unauthorized')
      Object.assign(user, req.body)
      return user.save()
    })
    .then(updatedUser => res.status(202).json(updatedUser))
    .catch(next)
}

function deleteUser(req, res, next) {
  User
    .findById(req.currentUser._id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}

// Likes & Comments

function likeUser(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) throw new Error('Not found')
      if (user.likes.some(item => item.user._id.equals(req.currentUser._id))) {
        const foundUser = user.likes.find(item => item.user._id.equals(req.currentUser._id))
        user.likes.splice(user.likes.indexOf(foundUser), 1)
        return user.save()
      }
      user.likes.push({ user: req.currentUser })
      return user.save()
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

function makeUserComment(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) throw new Error('Not found')
      user.comments.push({ user: req.currentUser, text: req.body.text })
      return user.save()
    })
    .then(user => res.status(202).json(user))
    .catch(next)
}

function editUserComment(req, res, next) {
  User
    .findById(req.params.id)
    .populate('comments.user')
    .then(user => {
      if (!user) throw new Error('Not found')
      user.comments.map(comment => {
        if (comment._id.equals(req.params.commentId) && comment.user._id.equals(req.currentUser._id)) {
          comment.text = req.body.text
          return comment.save()
        }
      })
      return user.save()
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

function deleteUserComment(req, res, next) {
  User
    .findById(req.params.id)
    .populate('comments.user')
    .then(user => {
      if (!user) throw new Error('Not found')
      user.comments.map(comment => {
        if (comment._id.equals(req.params.commentId) && comment.user._id.equals(req.currentUser._id)) {
          user.comments.splice(user.comments.indexOf(comment), 1)
          return
        }
      })
      return user.save()
    })
    .then(user => res.status(204).json(user))
    .catch(next)
}

module.exports = { 
  profile, 
  deleteUser, 
  updateProfile, 
  getUser, 
  getAllUsers, 
  likeUser, 
  makeUserComment,
  editUserComment,
  deleteUserComment 
}
