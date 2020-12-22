const express = require('express')
const employeeController = require('../controllers/employee')

const employeeRouter = express.Router()

employeeRouter
  .post('/', (req, resp) => {
    employeeController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })
  .get('/:id', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    employeeController.get(req.params.id, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
   
   .get('/', (req, resp, next) => {
    employeeController.getAll((err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
   
    .put('/:id', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    employeeController.put(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
   
   .delete('/:id', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    employeeController.delete(req.params.id, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
   })
  
module.exports = employeeRouter
