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
    client.exists(user.username, function(err, res){
      if (res==1) 
        return callback(new Error("Warning: the user already exists"), null)
      else{
        // Save to DB
        client.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res) // Return callback
      })}
    })
  },
  get: (username, callback) => {
    client.exists(username, function(err, res){
      if (res==0) return callback(new Error("User doesn't exist in database"), null)
      else{
        client.hgetall(username, function(err, res) {
          if (err) return callback(err, null)
          return callback(null, res)
        })}
  })
  }
}
