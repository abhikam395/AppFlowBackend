const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.bcryptPassword = async function(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err != undefined)
                reject(err);
            else resolve(hash);
        });
    })
}

module.exports.varifyPassword = async function(plainPassword, hashPassword){
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, hashPassword, function(err, result) {
            if(err != undefined)
                reject(err);
            else resolve(result);
        });
    })
}