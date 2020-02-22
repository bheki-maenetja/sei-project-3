const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/userModel')

function secureRoute(req, res, next) {
  if (!req.headers.authorization)
    throw new Error('Unauthorized')
  const token = req.headers.authorization.replace('Bearer ', '')
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if (!user) throw new Error('Unauthorized')
      req.currentUser = user
      next()
    })
    .catch(next)
}

module.exports = secureRoute
