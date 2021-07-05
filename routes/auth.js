var express = require('express');
var router = express.Router();
var {bcryptPassword, varifyPassword} = require('./../utils/bcrypt');
var {generateToken} = require('./../utils/jwt');
var {registerValidation, loginValidation} = require('./../middlewares/authValidation');
const User = require('./../models').User;

router.post('/register', registerValidation(),  async function(req, res, next) {
  const {username, name, email, password, address, mobile} = req.body;
  try {
    const hash = await bcryptPassword(password);
    const user = await User.create({
      username: username, 
      name: name, 
      email: email, 
      password: hash, 
      address: address, 
      mobile: mobile
    });
    const responseUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      address: user.address,
      mobile: user.mobile
    }
    const token = generateToken(responseUser);
    res.status(200).json({
      status: 'ok',
      message: 'User registered',
      data: {
        user: responseUser,
        token: token
      }
    })
  } catch (error) {
    let {parent, fields} = error;
    if(parent.errno === 1062 && Object.keys(fields)[0] === 'Users.username'){
      res.status(400).json({
        status: 'error',
        message: 'Username already taken',
      })
    }
    else if(parent.errno === 1062 && Object.keys(fields)[0] === 'Users.email'){
      res.status(400).json({
        status: 'error',
        message: 'Email already taken',
      })
    }
    else {
      res.status(400).json({
        status: 'error',
        message: 'Unable to register user',
      })
    }
  }
});

router.post('/login', loginValidation(), async function(req, res, next) {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      }
    });
    const passwordVarified = await varifyPassword(password, user.password);
    if(!passwordVarified){
      res.status(400).json({
        status: 'error',
        message: 'Check your password',
      })
      return;
    }
    const responseUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      address: user.address,
      mobile: user.mobile
    }
    const token = generateToken(responseUser);
    res.status(200).json({
      status: 'ok',
      message: 'User loggedin',
      data: {
        user: responseUser,
        token: token
      }
    })
  } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'User not registered',
      })
  }
});

module.exports = router;
