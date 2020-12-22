const { expect } = require('chai')
const employeeController = require('../src/controllers/employee')
const { dbsize } = require('../src/dbClient')

let client

const employee1 = {
	id: 'sergkudinov',
	firstname: 'Sergei',
	lastname: 'Kudinov',
	email: "sergei.kudinov@adaltas.com",
      	birth: "11/03/1990",
      	role: "Manager",
      	gender: "Male"
}

const employee2 = {
	id: 'viviend',
	firstname: 'Vivien',
	lastname: 'Detournay',
	email: "vivien.detournay@adaltas.com",
      	birth: "12/02/1990",
      	role: "Intern",
      	gender: "Male"
}
      
describe('employee', () => {

  describe('Create', () => {
    before(() => {
      client = require('../src/dbClient')
      client.flushall();
    })

    it('create new employees', (done) => {
      employeeController.create(employee1, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
      })
      
      employeeController.create(employee2, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong employee parameters', (done) => {
      const employee = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      employeeController.create(employee, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing employee', (done)=> {
      employeeController.create(employee1, (err, result) => {
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
   
      it('Get an employee', (done) => {
      employeeController.get(employee1.id, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(employee1)
          done()
       })
    })
    it('Get a employee that doesn\'t exist', (done) => {
      const employee = {
        id: 'sergkudinove',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      employeeController.get(employee.id, (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
    it('Get all employees', (done) => {
      employeeController.getAll((err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.deep.include(employee1,employee2)
          done()
       })
    })
  })
  
  describe('Put', ()=> {
    before(() => {
      client = require('../src/dbClient')
    })
    
  // TODO Create test for the get method
  // 1. First, create a employee to make this unit test independent from the others
  
      it('Modify an employee', (done) => {
      const employee = {
        id: 'sergkudinov',
        firstname: 'Serge',
        lastname: 'Kudinoph'
      }
      employeeController.put(employee, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
       })
       
       employeeController.get(employee.id, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.include(employee)
          done()
       })
    })
    
    it('Modify an employee that doesn\'t exist', (done) => {
      const employee = {
        id: 'sergkudinove',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      employeeController.put(employee, (err, result) => {
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
  // 1. First, create a employee to make this unit test independent from the others
  
      it('Delete an employee', (done) => {
      employeeController.delete(employee2.id, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal(1)
       })
       
       employeeController.get(employee2.id, (err, result) => {
         expect(err).to.be.equal(null)
         expect(result).to.be.equal(null)
          done()
       })
    })
    
    it('Delete an employee that doesn\'t exist', (done) => {
      employeeController.delete("employee_doesn't_exist", (err, result) => {
          expect(err).not.to.be.equal(null)
          expect(result).to.be.equal(null)
          done()
      })
    })
  })
})
