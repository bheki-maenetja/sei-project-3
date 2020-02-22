const Trip = require('../models/tripModel')

function index(req, res, next) {
  Trip 
    .find()
    .populate('organizer')
    .populate('interested.user')
    .populate('participants.user')
    .populate('comments.user')
    .populate('category')
    .then(foundTrip => res.status(200).json(foundTrip))
    .catch(next)
}

function createTrip(req, res, next) {
  req.body.organizer = req.currentUser
  
  Trip
    .create(req.body)
    .then(createdTrip => {
      createdTrip.participants.push({ user: req.currentUser })
      return createdTrip.save()
    })
    .then(createdTrip => res.status(201).json(createdTrip))
    
    .catch(next)
}

function showTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .populate('organizer')
    .populate('interested.user')
    .populate('participants.user')
    .populate('comments.user')
    .populate('category')
    .then(trip => {
      if (!trip) throw new Error('Not found')
      res.status(200).json(trip)
    })
    .catch(next)
}

function destroyTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => {
      if (!trip) throw new Error('Not found')
      if (!trip.organizer._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
      trip.remove().then(() => res.sendStatus(204))
    })
    .catch(next)
}

function editTrip(req, res, next){
  Trip
    .findById(req.params.id)
    .then(trip => {
      if (!trip) throw new Error('Not found')
      if (!trip.organizer._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
      Object.assign(trip, req.body)
      return trip.save()
    })
    .then(trip => res.status(202).json(trip))
    .catch(next)
}

// Join or Express Interest in a Trip
function joinTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => {
      if (!trip) throw new Error('Not found')
      if (trip.participants.some(item => item.user._id.equals(req.currentUser._id))) {
        const foundTrip = trip.participants.find(item => item.user._id.equals(req.currentUser._id))
        trip.participants.splice(trip.participants.indexOf(foundTrip), 1)
        return trip.save()
      }
      trip.participants.push({ user: req.currentUser })
      return trip.save()
    })
    .then(trip => res.status(202).json(trip))
    .catch(next)
}

function interestTrip(req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => {
      if (!trip) throw new Error('Not found')
      if (trip.interested.some(item => item.user._id.equals(req.currentUser._id))) {
        const foundTrip = trip.interested.find(item => item.user._id.equals(req.currentUser._id))
        trip.interested.splice(trip.interested.indexOf(foundTrip), 1)
        return trip.save()
      }
      trip.interested.push({ user: req.currentUser })
      return trip.save()
    })
    .then(trip => res.status(202).json(trip))
    .catch(next)
}

function makeTripComment(req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => {
      if (!trip) throw new Error('Not found')
      trip.comments.push({ user: req.currentUser, text: req.body.text })
      return trip.save()
    })
    .then(trip => res.status(202).json(trip))
    .catch(next)
}

function editTripComment(req, res, next) {
  Trip
    .findById(req.params.id)
    .populate('comments.user')
    .then(trip => {
      if (!trip) throw new Error('Not found')
      trip.comments.map(comment => {
        if (comment._id.equals(req.params.commentId) && comment.user._id.equals(req.currentUser._id)) {
          comment.text = req.body.text
          return comment.save()
        }
      })
      return trip.save()
    })
    .then(trip => res.status(201).json(trip))
    .catch(next)
}

function deleteTripComment(req, res, next) {
  Trip
    .findById(req.params.id)
    .populate('comments.user')
    .then(trip => {
      if (!trip) throw new Error('Not found')
      trip.comments.map(comment => {
        if (comment._id.equals(req.params.commentId) && comment.user._id.equals(req.currentUser._id)) {
          trip.comments.splice(trip.comments.indexOf(comment), 1)
          return
        }
      })
      return trip.save()
    })
    .then(trip => res.status(204).json(trip))
    .catch(next)
}

module.exports = { 
  index , 
  createTrip, 
  showTrip,
  editTrip,
  interestTrip, 
  joinTrip, 
  destroyTrip, 
  makeTripComment,
  editTripComment,
  deleteTripComment
}
