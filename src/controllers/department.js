const client = require('../dbClient')

module.exports = {
  create: (department, callback) => {
    // Check parameters
    if(!department.name)
      return callback(new Error("Wrong department parameters"), null)
    // Create department schema
    const departmentObj = {
      name: department.name
    }
    client.exists("department:"+department.name, function(err, res){
      if (res==1) 
        return callback(new Error("Warning: the department already exists"), null)
      else{
        // Save to DB
        client.hmset("department:"+department.name, departmentObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
  get: (name, callback) => {
    if(!name) return callback(new Error("Wrong department parameters"), null)
    client.exists("department:"+name, function(err, res){
      if (res==0) return callback(new Error("department doesn't exist in database"), null)
      else{
        client.hgetall("department:"+name, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  
  getEmployees: (name, employees, callback) => {
    client.exists("department:"+name, function(err, res){
      if (res==0) return callback(new Error("department doesn't exist in database"), null)

	  const multi = client.multi()
	  function inDepartment(employee){
	  	if (employee.department == name)
	        {
	  		multi.hgetall("employee:"+employee.id)
	  		console.log(employee.id)
	  	}
	  }
          employees.forEach(inDepartment)
	  //res.forEach(id => multi.hgetall(id))
          multi.exec(function(err, res){
	  	if (err) return callback(err, null)
         	return callback(null, res)
	  })    
     })
  },
  
  delete: (name, callback) => {
    if(!name) return callback(new Error("Wrong department parameters"), null)
    client.exists("department:"+name, function(err, res){
      if (res==0) return callback(new Error("department doesn't exist in database"), null)
      else{
        client.del("department:"+name, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  getAll: (callback) => {
        client.keys("department:*", function(err, res) {
	  const multi = client.multi()
	  res.forEach(name => multi.hgetall(name))
          multi.exec(function(err, res){
	  	if (err) return callback(err, null)
         	return callback(null, res)
	  })    
        })
  },
   /**put: (name, department, callback) => {
    // Check parameters
    if(!department.name)
      return callback(new Error("Wrong department parameters"), null)
    // Create department schema
    const departmentObj = {
      name: department.name,
    }
    client.exists("department:"+department.name, function(err, res){
      if (res==0) 
       return callback(new Error("Warning: the department already exists"), null)
      else{
        // Save to DB
        client.hmset("department:"+department.name, departmentObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },**/
}
