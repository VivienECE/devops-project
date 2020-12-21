const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

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
     
describe('User REST API', () => {

  before(() => {
    client = require('../src/dbClient')
  })
  
  after(()=> {
    app.close()
    client.quit()
  })

  describe('POST /user', () => {

    it('create new users', (done) => {
     
      chai.request(app)
        .post('/user')
        .send(user1)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        })
      chai.request(app)
        .post('/user')
        .send(user2)
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
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
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

  describe('GET /user', ()=> {
    it('get a new user', (done) => {
      chai.request(app)
        .get('/user/sergkudinov')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.include(user1)
          done()
        })
        .catch((err) => {
           throw err
        })
    })
     it('get all users', (done) => {
      chai.request(app)
        .get('/user/')
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          chai.expect(res.body.msg).to.deep.include(user1,user2)
          done()
        })
        .catch((err) => {
           throw err
        })
     })
   })
   
 describe('PUT /user', () => {

    it('modify one user', (done) => {
    const user = {
       username: 'sergkudinov',
       firstname: 'Serge',
       lastname: 'Kudinoph'
     }
     
      chai.request(app)
        .put('/user/sergkudinov')
        .send(user)
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
      const user = {
        username: 'sergkudinoph',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .put('/user/sergkudinoph')
        .send(user)
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
