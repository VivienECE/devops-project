const { expect } = require('chai')
const departmentController = require('../src/controllers/department')
const { dbsize } = require('../src/dbClient')

let client

const department1 = {
	name: 'devops',
}

const department2 = {
	name: 'frontend',
}
      
describe('department', () => {

  describe('Create', () => {
    before(() => {
      client = require('../src/dbClient')
      client.flushall();
    })

    it('create new departments', (done) => {
      departmentController.create(department1, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
      })
      
      departmentController.create(department2, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong department parameters', (done) => {
      const department = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      departmentController.create(department, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing department', (done)=> {
      departmentController.create(department1, (err, result) => {
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
   
      it('Get an department', (done) => {
      departmentController.get(department1.name, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(department1)
          done()
       })
    })
    it('Get a department that doesn\'t exist', (done) => {
      const department = {
        name: 'sergkudinove',
      }
      departmentController.get(department.name, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
    it('Get all departments', (done) => {
      departmentController.getAll((err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.deep.include(department1,department2)
          done()
       })
    })
  })
 
 //Require to modify all stranger keys "#department" in concerned employees
 /** describe('Put', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
  // TODO Create test for the get method
  // 1. First, create a department to make this unit test independent from the others
  
      it('Modify an department', (done) => {
      const newdepartment = {
        name: 'newfrontend',
      }
      departmentController.put(department2,newdepartment, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
       })
       
       departmentController.get(newdepartment.name, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(newdepartment)
          done()
       })
    })
    
    it('Modify an department that doesn\'t exist', (done) => {
      const department = {
        name: 'sergkudinove',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      departmentController.put(department, (err, result) => {
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
  // 1. First, create a department to make this unit test independent from the others
  
      it('Delete an department', (done) => {
      departmentController.delete(department2.name, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal(1)
       })
       
       departmentController.get(department2.name, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.be.equal(null)
          done()
       })
    })
    
    it('Delete an department that doesn\'t exist', (done) => {
      departmentController.delete("department_doesn't_exist", (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })
})
