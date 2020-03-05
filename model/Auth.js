const mongoose = require('../bootstrap/db');
const Schema = mongoose.Schema;
 //Model for expired (logouted) JWTs
const LogoutJWT = new Schema({
   token:{type:String}
}, {
    timestamps: false
});

module.exports = mongoose.model('LogoutJWT', LogoutJWT);