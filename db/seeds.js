const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')

const Trip = require('../models/tripModel')
const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Group = require('../models/groupModel')

const { userObjs, categoryObjs, tripObjs, groupObjs } = require('./seedObjs')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => Group.create(groupObjs))
      .then(() => User.create(userObjs))
      .then(userModels => {
        tripObjs.map(obj => obj.organizer = userModels.find(model => model.name === obj.organizer))
        
        tripObjs[0].participants.push({ user: userModels[0] })
        tripObjs[0].participants.push({ user: userModels[1] })
        tripObjs[1].participants.push({ user: userModels[2] })
        tripObjs[1].participants.push({ user: userModels[1] })
        tripObjs[2].participants.push({ user: userModels[1] })
        tripObjs[2].participants.push({ user: userModels[2] })
        tripObjs[3].participants.push({ user: userModels[1] })
        tripObjs[4].participants.push({ user: userModels[1] })
        tripObjs[5].participants.push({ user: userModels[1] })
        tripObjs[6].participants.push({ user: userModels[2] })
        tripObjs[7].participants.push({ user: userModels[1] })
        tripObjs[8].participants.push({ user: userModels[0] })
        tripObjs[9].participants.push({ user: userModels[2] })
        tripObjs[10].participants.push({ user: userModels[1] })
        tripObjs[0].interested.push({ user: userModels[1] })
        tripObjs[1].interested.push({ user: userModels[0] })
        tripObjs[2].interested.push({ user: userModels[2] })
        tripObjs[3].interested.push({ user: userModels[2] })
        tripObjs[4].interested.push({ user: userModels[0] })
        return Category.create(categoryObjs)
      })
      .then(catModels => {
        tripObjs.map(obj => obj.category = catModels.find(model => model.name === obj.category))
        return Trip.create(tripObjs)
      })
      .then(() => console.log('Data successfully created!'))
      .catch(err => console.log('SOMETHING IS VERY WRONG!!!', err))
      .finally(() => mongoose.connection.close())
  }
)
