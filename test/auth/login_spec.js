/* global describe beforeEach afterEach it api expect */
const User = require('../../backend/models/userModel')

const loginDataCorrect = {
  email: 'nik@email.com',
  password: 'pass'
}

const loginIncorrectPassword = {
  email: 'nik@email.com',
  password: 'notpass'
}

const loginIncorrectEmail = {
  email: 'nikiiii@email.com',
  password: 'pass'
}

describe('testing login controller POST to /login', () => {
  beforeEach(done => {
    User.create({
      name: 'Nik',
      email: 'nik@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      dob: new Date(),
      country: 'Russia',
      city: 'Moscow',
      gender: 'Male',
      languages: 'Russian',
      profileImage: 'image.jpg',
      organizedTrips: [],
      joinedTrips: [],
      favoriteTrips: []
    }).then(() => done())
  })
  afterEach(done => {
    User.deleteMany().then(() => done())
  })


  it('should return status 401 if password is incorrect', done => {
    api.post('/api/login').send(loginIncorrectPassword).end((err, res) => {
      expect(res.status).to.eq(401)
      done()
    })
  })

  it('should return status 401 if email is incorrect', done => {
    api.post('/api/login').send(loginIncorrectEmail).end((err, res) => {
      expect(res.status).to.eq(401)
      done()
    })
  })

  it('should return status 202 if credentials are correct', done => {
    api.post('/api/login').send(loginDataCorrect).end((err, res) => {
      expect(res.status).to.eq(202)
      done()
    })
  })

  it('should return an object if credentials are correct', done => {
    api.post('/api/login').send(loginDataCorrect).end((err, res) => {
      expect(res.body).to.be.an('object')
      done()
    })
  })

  it('should return an object with keys message and token', done => {
    api.post('/api/login').send(loginDataCorrect).end((err, res) => {
      expect(res.body).to.contains.keys(['message', 'token'])
      done()
    })
  })

  it('should return an object with keys message and token with correct data types', done => {
    api.post('/api/login').send(loginDataCorrect).end((err, res) => {
      expect(res.body.message).to.be.a('string')
      expect(res.body.token).to.be.a('string')
      done()
    })
  })

})
