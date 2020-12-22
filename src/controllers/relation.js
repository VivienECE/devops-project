const client = require('../dbClient')

module.exports = {
  create: (relation, callback) => {
    // Check parameters
    if(!relation.id)
      return callback(new Error("Wrong relation parameters"), null)
    // Create relation schema
    const relationObj = {
      id: relation.id,
      responsible: relation.responsible,
      employee: relation.employee,
    }
    client.exists("relation:"+relation.id, function(err, res){
      if (res==1) 
        return callback(new Error("Warning: the relation already exists"), null)
      else{
        // Save to DB
        client.hmset("relation:"+relation.id, relationObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
  get: (id, callback) => {
    if(!id) return callback(new Error("Wrong relation parameters"), null)
    client.exists("relation:"+id, function(err, res){
      if (res==0) return callback(new Error("relation doesn't exist in database"), null)
      else{
        client.hgetall("relation:"+id, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  getEmployeesOfResponsible: (responsible, relations, callback) => {
      const multi = client.multi()
      function findEmployees(relation){
	  	if (relation.responsible == responsible)   
	  		multi.hgetall("employee:"+relation.employee)}
      relations.forEach(findEmployees)
      multi.exec(function(err, res){
      if (err) return callback(err, null)
      return callback(null, res)
   })    
  },
  delete: (id, callback) => {
    if(!id) return callback(new Error("Wrong relation parameters"), null)
    client.exists("relation:"+id, function(err, res){
      if (res==0) return callback(new Error("relation doesn't exist in database"), null)
      else{
        client.del("relation:"+id, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  getAll: (callback) => {
        client.keys("relation:*", function(err, res) {
	  const multi = client.multi()
	  res.forEach(id => multi.hgetall(id))
          multi.exec(function(err, res){
	  	if (err) return callback(err, null)
         	return callback(null, res)
	  })    
        })
  },
   put: (relation, callback) => {
    // Check parameters
    if(!relation.id)
      return callback(new Error("Wrong relation parameters"), null)
    // Create relation schema
    const relationObj = {
      id: relation.id,
      responsible: relation.responsible,
      employee: relation.employee,
    }
    client.exists("relation:"+relation.id, function(err, res){
      if (res==0) 
       return callback(new Error("Warning: the relation already exists"), null)
      else{
        // Save to DB
        client.hmset("relation:"+relation.id, relationObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
}
