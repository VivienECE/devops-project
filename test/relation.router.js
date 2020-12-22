const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

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
     
describe('relation REST API', () => {

  before(() => {
    client = require('../src/dbClient')
  })
 
  describe('POST /relation', () => {

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
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const relation = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/relation')
        .send(relation)
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

  describe('GET /relation', ()=> {
    it('get a new relation', (done) => {
      chai.request(app)
        .get('/relation/sergkudinovviviend')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.include(relation1)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
     it('get all relations', (done) => {
      chai.request(app)
        .get('/relation/')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.deep.include(relation1,relation2)
          done()
        })
        .catch((err) => {
           throw err
        })
     })
   })
   
 /**
 describe('PUT /relation', () => {

    it('modify one relation', (done) => {
    const relation = {
       id: 'sergkudinov',
       firstname: 'Serge',
       lastname: 'Kudinoph'
     }
     
      chai.request(app)
        .put('/relation/sergkudinov')
        .send(relation)
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
      const relation = {
        id: 'sergkudinoph',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .put('/relation/sergkudinoph')
        .send(relation)
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
  
  describe('DELETE /relation', () => {

    it('delete one relation', (done) => {
      chai.request(app)
        .delete('/relation/sergkudinovviviend')
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
    
    it('delete a non-existent relation', (done) => {
      const relation = {
        id: 'sergkudinoph',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .delete('/relation/sergkudinoph')
        .send(relation)
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
