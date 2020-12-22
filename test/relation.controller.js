const { expect } = require('chai')
const relationController = require('../src/controllers/relation')
const { dbsize } = require('../src/dbClient')

let client

const relation1 = {
	id: 'sergkudinovviviend',
	responsible: 'sergkudinov',
	employee: 'viviend'
}

const relation2 = {
	id: 'davidwsergkudinov',
	responsible: 'davidw',
	employee: 'sergkudinov'
}
      
describe('relation', () => {

  describe('Create', () => {
    before(() => {
      client = require('../src/dbClient')
      client.flushall();
    })

    it('create new relations', (done) => {
      relationController.create(relation1, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
      })
      
      relationController.create(relation2, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong relation parameters', (done) => {
      const relation = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      relationController.create(relation, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing relation', (done)=> {
      relationController.create(relation1, (err, result) => {
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
   
      it('Get an relation', (done) => {
      relationController.get(relation1.id, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(relation1)
          done()
       })
    })
    it('Get a relation that doesn\'t exist', (done) => {
      const relation = {
        id: 'sergkudinove',
      }
      relationController.get(relation.id, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
    it('Get all relations', (done) => {
      relationController.getAll((err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.deep.include(relation1,relation2)
          done()
       })
    })
  })

/**Deleted, then recreate to match id, no modifying for relations
/**  describe('Put', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
  // TODO Create test for the get method
  // 1. First, create a relation to make this unit test independent from the others
  
      it('Modify an relation', (done) => {
      const relation = {
        id: 'sergkudinovviviend',
        firstname: 'Serge',
        lastname: 'Kudinoph'
      }
      relationController.put(relation, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
       })
       
       relationController.get(relation.id, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(relation)
          done()
       })
    })
    
    it('Modify an relation that doesn\'t exist', (done) => {
      const relation = {
        id: 'sergkudinove',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      relationController.put(relation, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })**/
  
  describe('Delete', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
     after(() => {
      client.flushall();
    })

  // TODO Create test for the get method
  // 1. First, create a relation to make this unit test independent from the others
  
      it('Delete an relation', (done) => {
      relationController.delete(relation2.id, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal(1)
       })
       
       relationController.get(relation2.id, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.be.equal(null)
          done()
       })
    })
    
    it('Delete an relation that doesn\'t exist', (done) => {
      relationController.delete("relation_doesn't_exist", (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })
})
