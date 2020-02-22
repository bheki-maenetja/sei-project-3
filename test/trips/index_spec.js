/* global describe beforeEach afterEach it api expect*/

const User = require('../../backend/models/userModel')
const Trip = require('../../backend/models/tripModel')
const Category = require('../../backend/models/categoryModel')

let createdUser
let createdTrip

describe('testing trip controller get all trips GET /index', () => {
  beforeEach(done => {
    return User.create({
      name: 'Bheki',
      email: 'bheki@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      dob: new Date(),
      country: 'South Africa',
      city: 'Johannesburg',
      gender: 'Male',
      languages: 'Sotho',
      profileImage: 'my-image.jpg',
      organizedTrips: [],
      joinedTrips: [],
      favoriteTrips: []
    })
      .then(user => (createdUser = user))
      .then(() => {
        return Category.create({
          name: 'Beach'
        })
      })
      .then(category => {
        return Trip.create(
          {
            name: 'Trip 1',
            organizer: createdUser,
            countries: ['United Kingdom'],
            startingDate: new Date(),
            endingDate: new Date(),
            category: category,
            description: 'description. it is my funny trip',
            participants: [],
            budget: 'lots of money'
          },
          {
            name: 'Trip 2',
            organizer: createdUser,
            countries: ['India'],
            startingDate: new Date(),
            endingDate: new Date(),
            category: category,
            description: 'description. it is my funny trip',
            participants: [],
            budget: 'lots of money'
          },
          {
            name: 'Trip 3',
            organizer: createdUser,
            countries: ['France'],
            startingDate: new Date(),
            endingDate: new Date(),
            category: category,
            description: 'description. it is my funny trip',
            participants: [],
            budget: 'lots of money'
          }
        )
      })
      .then(trips => createdTrip = trips[0])
      .then(done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Category.deleteMany())
      .then(() => Trip.deleteMany())
      .then(() => done())
  })

  it('should return a 200 status', done => {
    api.get('/api/trips').end((err, res) => {
      expect(res.status).to.eq(200)
      done()
    })
  })

  it('should return an array', done => {
    api.get('/api/trips').end((err, res) => {
      expect(res.body).to.be.an('array')
      done()
    })
  })

  it('should return an array of objects', done => {
    api.get('/api/trips').end((err, res) => {

      res.body.forEach(trip => {
        expect(trip).to.be.an('object')
      })
      done()
    })
  })

  it('should return an array of objects with correct keys', done => {
    api.get('/api/trips').end((err, res) => {
      res.body.forEach(trip => {
        expect(trip).to.contains.keys(Object.keys(createdTrip))
      })
      done()
    })
  })

  it('should return an array of objects with correct keys and values data types', done => {
    api.get('/api/trips').end((err, res) => {
      res.body.forEach(trip => {
        expect(trip.organizer).to.be.an('object')
        expect(trip.countries).to.be.an('array')
        expect(trip.startingDate).to.be.a('string')
        expect(trip.endingDate).to.be.a('string')
        expect(trip.category).to.be.an('object')
        expect(trip.description).to.be.a('string')
        expect(trip.participants).to.be.an('array')
        expect(trip.budget).to.be.a('string')
      })
      done()
    })
  })
})
