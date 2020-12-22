const client = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    
    // TODO check if user already exists
    client.exists(user.username, function(err, res){
      if (res==1) 
        return callback(new Error("Warning: the user already exists"), null)
      else{
        // Save to DB
        client.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      })}
    })
  },
  get: (username, callback) => {
    client.hmget(username, firstname, lastname, (err, res) =>{
      if(err) return callback(new Error("User doesn't exist"), null)
      callback(null, res) // Return callback
  })
  }
}
