const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
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
  .get('/:username', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    userController.get(req.params.username, (err, res) => {
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
    userController.getAll((err, res) => {
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
   
    .put('/:username', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    userController.put(req.body, (err, res) => {
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
   
   .delete('/:username', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    userController.delete(req.params.username, (err, res) => {
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
  
module.exports = userRouter
