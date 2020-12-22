const client = require('../dbClient')

module.exports = {
  create: (employee, callback) => {
    // Check parameters
    if(!employee.id)
      return callback(new Error("Wrong employee parameters"), null)
    // Create employee schema
    const employeeObj = {
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      email: employee.email,
      birth: employee.birth,
      role: employee.role,
      gender: employee.gender,
      department: employee.department
    }
    client.exists("employee:"+employee.id, function(err, res){
      if (res==1) 
        return callback(new Error("Warning: the employee already exists"), null)
      else{
        // Save to DB
        client.hmset("employee:"+employee.id, employeeObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
  get: (id, callback) => {
    if(!id) return callback(new Error("Wrong employee parameters"), null)
    client.exists("employee:"+id, function(err, res){
      if (res==0) return callback(new Error("employee doesn't exist in database"), null)
      else{
        client.hgetall("employee:"+id, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  delete: (id, callback) => {
    if(!id) return callback(new Error("Wrong employee parameters"), null)
    client.exists("employee:"+id, function(err, res){
      if (res==0) return callback(new Error("employee doesn't exist in database"), null)
      else{
        client.del("employee:"+id, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  getAll: (callback) => {
        client.keys("employee:*", function(err, res) {
	  const multi = client.multi()
	  res.forEach(id => multi.hgetall(id))
          multi.exec(function(err, res){
	  	if (err) return callback(err, null)
         	return callback(null, res)
	  })    
        })
  },
   put: (employee, callback) => {
    // Check parameters
    if(!employee.id)
      return callback(new Error("Wrong employee parameters"), null)
    // Create employee schema
    const employeeObj = {
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
    }
    client.exists("employee:"+employee.id, function(err, res){
      if (res==0) 
       return callback(new Error("Warning: the employee already exists"), null)
      else{
        // Save to DB
        client.hmset("employee:"+employee.id, employeeObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
}
