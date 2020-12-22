const { expect } = require('chai')
const userController = require('../src/controllers/user')
const { dbsize } = require('../src/dbClient')

let client

describe('User', () => {

  describe('Create', () => {
    before(() => {
      client = require('../src/dbClient')
    })

    it('create a new user', (done) => {
      client.flushall();
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
    //   // TODO create this test
    //   // Warning: the user already exists
     const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  })

  describe('Get', () => {
  // TODO Create test for the get method
  // 1. First, create a user to make this unit test independent from the others
    it('Get a user by username', (done) => {
     const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })  
      userController.get(user.username, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.eql(user)
        done()
      })
    })
   
    it('Get a user that doesn\'t exist', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.get(user.username, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).not.to.be.equal("OK")
          done()
      })
    })
  })
})
