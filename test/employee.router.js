const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let client
const employee1 = {
	id: 'sergkudinov',
	firstname: 'Sergei',
	lastname: 'Kudinov',
	email: "sergei.kudinov@adaltas.com",
      	birth: "11/03/1990",
      	role: "Manager",
      	gender: "Male",
      	department: "devops"
}

const employee2 = {
	id: 'viviend',
	firstname: 'Vivien',
	lastname: 'Detournay',
	email: "vivien.detournay@adaltas.com",
      	birth: "12/02/1990",
      	role: "Intern",
      	gender: "Male",
      	department: "devops"
}

const employee3 = {
	id: 'davidw',
	firstname: 'David',
	lastname: 'Worms',
	email: "david.worms@adaltas.com",
      	birth: "10/05/1983",
      	role: "Director",
      	gender: "Male",
      	department: "frontend"
}

const employee4 = {
	id: 'clemencej',
	firstname: 'Clemence',
	lastname: 'Jean-Louis Dit Montout',
	email: "clemence.jldm@adaltas.com",
      	birth: "11/03/1999",
      	role: "Intern",
      	gender: "Woman",
      	department: "devops"
}

const department1 = {
	name: 'devops',
}

const department2 = {
	name: 'frontend',
}

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

const relation3 = {
	id: 'sergkudinovclemencej',
	responsible: 'sergkudinov',
	employee: 'clemencej'
}
     
describe('employee REST API', () => {

  before(() => {
    client = require('../src/dbClient')
  })

  describe('POST /employee', () => {

    it('create new employees', (done) => {
     
      chai.request(app)
        .post('/employee')
        .send(employee1)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
      chai.request(app)
        .post('/employee')
        .send(employee2)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
      chai.request(app)
        .post('/employee')
        .send(employee3)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
      chai.request(app)
        .post('/employee')
        .send(employee4)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const employee = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/employee')
        .send(employee)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })


  describe('GET /employee', ()=> {
    it('get a new employee', (done) => {
      chai.request(app)
        .get('/employee/sergkudinov')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.include(employee1)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
     it('get all employees', (done) => {
      chai.request(app)
        .get('/employee/')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.deep.include(employee1,employee2)
          done()
        })
        .catch((err) => {
           throw err
        })
     })
     
      it('create new departments', (done) => {
     
      chai.request(app)
        .post('/department')
        .send(department1)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
      chai.request(app)
        .post('/department')
        .send(department2)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
     it('get all employees in 1 department', (done) => {
      chai.request(app)
        .get('/department/devops/employees')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.deep.include(employee1,employee2)
          chai.expect(res.body.msg).to.not.deep.include(employee3)
          done()
        })
        .catch((err) => {
           throw err
        })
     })
     
       it('create new relations', (done) => {
     
      chai.request(app)
        .post('/relation')
        .send(relation1)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
        chai.request(app)
        .post('/relation')
        .send(relation2)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
      chai.request(app)
        .post('/relation')
        .send(relation3)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
           done()
        })
    })
      
        it('get all employees of 1 responsible', (done) => {
      chai.request(app)
        .get('/relation/responsible/sergkudinov')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.deep.include(employee4,employee2)
          chai.expect(res.body.msg).to.not.deep.include(employee3)
          done()
        })
        .catch((err) => {
           throw err
           done()
        })
     })
    
   })
   
 describe('PUT /employee', () => {

    it('modify one employee', (done) => {
    const employee = {
	id: 'sergkudinov',
	firstname: 'Sergei',
	lastname: 'Kudinov',
	email: "sergei.kudinov@adaltas.com",
      	birth: "11/03/1990",
      	role: "Director",
      	gender: "Male",
      	department: "devops"
    }
     
      chai.request(app)
        .put('/employee/sergkudinov')
        .send(employee)
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
           done()
        })
    })
    
    it('pass wrong parameters', (done) => {
      const employee = {
        id: 'sergkudinoph',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .put('/employee/sergkudinoph')
        .send(employee)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
  
  describe('DELETE /employee', () => {

    it('delete one employee', (done) => {
      chai.request(app)
        .delete('/employee/viviend')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res.body.msg).to.be.equal(1)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('delete a non-existent employee', (done) => {
      const employee = {
        id: 'sergkudinoph',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .delete('/employee/sergkudinoph')
        .send(employee)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
})
