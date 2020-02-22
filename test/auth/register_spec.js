/* global describe beforeEach afterEach it api expect */
const User = require('../../backend/models/userModel')

const testDataNotMatchingPasswords = {
  name: 'test',
  email: 'test@email.com',
  password: 'test',
  passwordConfirmation: 'nottest',
  dob: new Date(),
  country: 'Russia',
  city: 'Moscow',
  gender: 'Male',
  languages: 'Russian',
  profileImage: 'image.jpg'
}

const testDataDuplicateEmail = {
  name: 'test',
  email: 'nik@email.com',
  password: 'test',
  passwordConfirmation: 'nottest',
  dob: new Date(),
  country: 'Russia',
  city: 'Moscow',
  gender: 'Male',
  languages: 'Russian',
  profileImage: 'image.jpg'
}

const testDataCorrect = {
  name: 'test',
  email: 'test@email.com',
  password: 'test',
  passwordConfirmation: 'test',
  dob: new Date(),
  country: 'Russia',
  city: 'Moscow',
  gender: 'Male',
  languages: 'Russian',
  profileImage: 'image.jpg'
}


describe('testing registration controller: POST to /register', () => {
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
      languages: ['Russian'],
      profileImage: 'image.jpg',
      organizedTrips: [],
      joinedTrips: [],
      favoriteTrips: []
    }).then(() => done())
  })
  afterEach(done => {
    User.deleteMany().then(() => done())
  })

  it('should return 422 if password does not match password confirmation', done => {
    api.post('/api/register').send(testDataNotMatchingPasswords).end((err, res) => {
      expect(res.status).to.eq(422)
      done()
    })
  })

  it('should return 422 if email already exists', done => {
    api.post('/api/register').send(testDataDuplicateEmail).end((err, res) => {
      expect(res.status).to.eq(422)
      done()
    })
  })

  it('should return 201 if passwords match', done => {
    api.post('/api/register').send(testDataCorrect).end((err, res) => {
      expect(res.status).to.eq(201)
      done()
    })
  })

  it('should return an object', done => {
    api.post('/api/register').send(testDataCorrect).end((err, res) => {
      expect(res.body).to.be.an('object')
      done()
    })
  })
  it('should return an object with message key', done => {
    api.post('/api/register').send(testDataCorrect).end((err, res) => {
      expect(res.body).to.contains.keys(['message'])
      done()
    })
  })
})
