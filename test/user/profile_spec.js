/* global describe beforeEach afterEach it api expect */
const User = require('../../backend/models/userModel')
const jwt = require('jsonwebtoken')
const { secret } = require('../../backend/config/environment')

const testUserData = {
  name: 'Nik',
  email: 'nik@email.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  dob: new Date(),
  country: 'Russia',
  city: 'Moscow',
  gender: 'Male',
  languages: ['Russian'],
  profileImage: 'image.jpg'
}

let currentUser

describe('testing profile controller GET to /myprofile', () => {
  let token
  beforeEach(done => {
    User
      .create(testUserData)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
        currentUser = user
      })
      .then(() => done())
  })
  afterEach(done => {
    User.deleteMany().then(() => done())
  })

  it('should return status 401 without a token', done => {
    api
      .get('/api/profile')
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return status 200 with correct token', done => {
    api
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with correct keys', done => {
    api
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys(Object.keys(currentUser._doc).filter(key => key !== 'password'))
        done()
      })
  })


  it('should return an object with correct values data types', done => {
    api
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.name).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        // expect(res.body.password).to.be.a('string')
        expect(res.body.dob).to.be.a('string')
        expect(res.body.country).to.be.a('string')
        expect(res.body.city).to.be.a('string')
        expect(res.body.gender).to.be.a('string')
        expect(res.body.languages).to.be.an('array')
        expect(res.body.profileImage).to.be.a('string')
        expect(res.body.joinedTrips).to.be.an('array')
        expect(res.body.organizedTrips).to.be.an('array')
        expect(res.body.favoriteTrips).to.be.an('array')
        done()
      })
  })
})
