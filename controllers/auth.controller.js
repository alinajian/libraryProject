
const controller = {};
const User = require('../model/User');
const LogoutJWT = require('../model/Auth');
const jwt = require('jsonwebtoken');
const userController = require('./user.controller');
const privateKey = require('../config').secretKey;
const guard = require('../middlewares/guard');

controller.register = userController.storeUser;

controller.logout = async (req, res) => {

    try {
        const { auth } = req.headers;
        if(!auth){
            return res.send({
                status: false,
                msg: 'No JWT in header!'
            });
        }
        const newExpiredJWT = await new LogoutJWT({token:auth}).save();
        return res.send({
            status: true,
            msg: 'Logged Out'
        });
    } catch (e) {
        res.send(e);
    }
}
controller.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({
      status: false,
      msg: 'Please provide the correct data'
    });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        msg: 'No user found'
      });
    } else {
      // FOUND USER
      user.comparePassword(password, function(err, isMatch){
        if (isMatch) {
          // JWT
          jwt.sign({ email: user.email }, privateKey, {expiresIn: '1h'}, function(err, token) {
            if (!err) {
              res.send({
                token
              });
            }
          });
        } else {
          res.send('ERROR LOGIN');
        }
      })
    }
  }
}

module.exports = controller;