const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res, next) {
  User.create(req.body)
    .then(user =>
      res
        .status(201)
        .json({ message: `Thank you for registering ${user.name}` })
    )
    .catch(next)
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        throw new Error('Unauthorized')
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      res.status(202).json({
        message: `Welcome back ${user.name}`,
        token
      })
    })
    .catch(next)
}

module.exports = { register, login }
