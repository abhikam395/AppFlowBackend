var jwt = require('jsonwebtoken');

module.exports.generateToken =  function(user){
    return jwt.sign({user: user }, 'shhhhh');
}