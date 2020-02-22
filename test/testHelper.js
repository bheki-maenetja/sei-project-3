process.env.NODE_ENV = 'test'
process.env.PORT = 3000
const chai = require('chai')
global.expect = chai.expect

const supertest = require('supertest')
const app = require('../backend/index')

global.api = supertest(app)