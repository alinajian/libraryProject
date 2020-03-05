// Mongoose
const bcrypt = require('bcrypt');
const mongoose = require('../bootstrap/db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  family: { type: String, required: false },
   avatar:{ type: String, required: false},
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false, min: 10, max: 100 },
  password: { type: String, minlength: 6 },
  books:{ type: [Schema.Types.ObjectId], ref: 'Book',required: false,default:[]},
    type:{type:String,required:false,default:"Customer"},

}, {
  timestamps: true
});

UserSchema.methods.comparePassword = function(password, cb){
  const user = this;
  bcrypt.compare(password, user.password, function(err, isMatch) {
    if (isMatch) {
      cb(null, isMatch);
    } else {
      cb('ERROR', false);
    }
  });
};

UserSchema.pre('save', function(next){
  const user = this;
  bcrypt.genSalt(10, function(error, salt){
    if (error) {
      next(error);
    }
    bcrypt.hash(user.password, salt, function(error, encyptedPassword){
      user.password = encyptedPassword;
      next();
    });
  })
})

module.exports = mongoose.model('User', UserSchema);
