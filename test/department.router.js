const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let client
const department1 = {
	name: 'devops',
}

const department2 = {
	name: 'frontend',
}
     
describe('department REST API', () => {

  before(() => {
    client = require('../src/dbClient')
  })

  describe('POST /department', () => {

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
    
    it('pass wrong parameters', (done) => {
      const department = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/department')
        .send(department)
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

  describe('GET /department', ()=> {
    it('get a new department', (done) => {
      chai.request(app)
        .get('/department/devops')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.include(department1)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
     it('get all departments', (done) => {
      chai.request(app)
        .get('/department/')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.deep.include(department1,department2)
          done()
        })
        .catch((err) => {
           throw err
        })
     })
   })
   
 /**describe('PUT /department', () => {

    it('modify one department', (done) => {
    const department = {
       name: 'sergkudinov',
       firstname: 'Serge',
       lastname: 'Kudinoph'
     }
     
      chai.request(app)
        .put('/department/sergkudinov')
        .send(department)
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const department = {
        name: 'sergkudinoph',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .put('/department/sergkudinoph')
        .send(department)
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
  })**/
  
  describe('DELETE /department', () => {

    it('delete one department', (done) => {
      chai.request(app)
        .delete('/department/devops')
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
    
    it('delete a non-existent department', (done) => {
      const department = {
        name: 'sergkudinoph',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .delete('/department/sergkudinoph')
        .send(department)
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
