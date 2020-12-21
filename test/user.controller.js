const { expect } = require('chai')
const userController = require('../src/controllers/user')
const { dbsize } = require('../src/dbClient')

let client

const user1 = {
	username: 'sergkudinov',
	firstname: 'Sergei',
	lastname: 'Kudinov'
}

const user2 = {
	username: 'viviend',
	firstname: 'Vivien',
	lastname: 'Detournay'
}
      
describe('User', () => {

  describe('Create', () => {
    before(() => {
      client = require('../src/dbClient')
      client.flushall();
    })

    it('create new users', (done) => {
      userController.create(user1, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
      })
      
      userController.create(user2, (err, result) => {
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
      userController.create(user1, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  })

  describe('Get', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
   
      it('Get an user', (done) => {
      userController.get(user1.username, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(user1)
          done()
       })
    })
    it('Get a user that doesn\'t exist', (done) => {
      const user = {
        username: 'sergkudinove',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.get(user.username, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
    it('Get all users', (done) => {
      userController.getAll((err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.deep.include(user1,user2)
          done()
       })
    })
  })
  
  describe('Put', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
  // TODO Create test for the get method
  // 1. First, create a user to make this unit test independent from the others
  
      it('Modify an user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Serge',
        lastname: 'Kudinoph'
      }
      userController.put(user, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
       })
       
       userController.get(user.username, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(user)
          done()
       })
    })
    
    it('Modify an user that doesn\'t exist', (done) => {
      const user = {
        username: 'sergkudinove',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.put(user, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })
  
  describe('Delete', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
     after(() => {
      client.flushall();
    })

  // TODO Create test for the get method
  // 1. First, create a user to make this unit test independent from the others
  
      it('Delete an user', (done) => {
      userController.delete(user2.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal(1)
       })
       
       userController.get(user2.username, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.be.equal(null)
          done()
       })
    })
    
    it('Delete an user that doesn\'t exist', (done) => {
      userController.delete("user_doesn't_exist", (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })
})
