const express = require('express')
const departmentController = require('../controllers/department')

const departmentRouter = express.Router()

departmentRouter
  .post('/', (req, resp) => {
    departmentController.create(req.body, (err, res) => {
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
  .get('/:name', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    departmentController.get(req.params.name, (err, res) => {
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
    departmentController.getAll((err, res) => {
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
   
    /**.put('/:name', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    departmentController.put(req.body, (err, res) => {
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
   })**/
   
   .delete('/:name', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    departmentController.delete(req.params.name, (err, res) => {
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
  
module.exports = departmentRouter
