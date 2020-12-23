const express = require('express')
const userRouter = require('./routes/user')
const employeeRouter = require('./routes/employee')
const departmentRouter = require('./routes/department')
const relationRouter = require('./routes/relation')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.BACKEND_PORT || 3000

const client = require('./dbClient')
client.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())

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
