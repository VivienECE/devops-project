import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import { Provider as ContextProvider } from './Context';
import * as serviceWorker from './serviceWorker';
// Layout
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import {
  BrowserRouter as Router,
} from "react-router-dom";
const express = require('express')
const userRouter = require('./routes/user')
const employeeRouter = require('./routes/employee')
const departmentRouter = require('./routes/department')
const relationRouter = require('./routes/relation')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const client = require('./dbClient')
client.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', userRouter)
app.use('/employee', employeeRouter)
app.use('/department', departmentRouter)
app.use('/relation', relationRouter)

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server
