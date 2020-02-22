const express = require('express')
const app = express()
const { port, dbURI } = require('./config/environment')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('./lib/logger')
const handleError = require('./lib/errorHandler')
const router = require('./config/router')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) return console.log(err)
    console.log(`Mongo is connected to '${dbURI}'`)
  }
)

app.use(bodyParser.json())
app.use(logger)

app.use('/api',router)
app.use(handleError)

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app