const jwt = require('jsonwebtoken');
const privateKey = require('../config').secretKey;
const LogoutJWT = require('../model/Auth');
module.exports = (req, res, next) => {
  const { auth } = req.headers;
  if (!auth) {
    res.send('AUTHENTICATION ERROR');
  } else {


    jwt.verify(auth, privateKey, function(err, verified) {
      if (err) res.send('AUTHENTICATION ERROR');
      if (verified) {
        //Check if JWT expired!
          LogoutJWT.findOne({ token: auth},function (err,result) {

              if(result){
                  res.send('JWT Expired (Logged Out)');
                  return;
              }
              next();
          })

      }
    });
  }
}