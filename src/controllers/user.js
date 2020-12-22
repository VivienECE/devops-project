const client = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    }
    client.exists("user:"+user.username, function(err, res){
      if (res==1) 
        return callback(new Error("Warning: the user already exists"), null)
      else{
        // Save to DB
        client.hmset("user:"+user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
  get: (username, callback) => {
    if(!username) return callback(new Error("Wrong user parameters"), null)
    client.exists("user:"+username, function(err, res){
      if (res==0) return callback(new Error("User doesn't exist in database"), null)
      else{
        client.hgetall("user:"+username, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  delete: (username, callback) => {
    if(!username) return callback(new Error("Wrong user parameters"), null)
    client.exists("user:"+username, function(err, res){
      if (res==0) return callback(new Error("User doesn't exist in database"), null)
      else{
        client.del("user:"+username, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
    })
  },
  getAll: (callback) => {
        client.keys("user:*", function(err, res) {
	  const multi = client.multi()
	  res.forEach(username => multi.hgetall(username))
          multi.exec(function(err, res){
	  	if (err) return callback(err, null)
         	return callback(null, res)
	  })    
        })
  },
   put: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    }
    client.exists("user:"+user.username, function(err, res){
      if (res==0) 
       return callback(new Error("Warning: the user already exists"), null)
      else{
        // Save to DB
        client.hmset("user:"+user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
}
