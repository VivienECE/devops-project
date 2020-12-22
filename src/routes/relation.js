const express = require('express')
const relationController = require('../controllers/relation')

const relationRouter = express.Router()

relationRouter
  .post('/', (req, resp) => {
    relationController.create(req.body, (err, res) => {
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
    relationController.get(req.params.id, (err, res) => {
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
    relationController.getAll((err, res) => {
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
   
/**    .put('/:id', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    relationController.put(req.body, (err, res) => {
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
   
   .delete('/:id', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    relationController.delete(req.params.id, (err, res) => {
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
  
module.exports = relationRouter
