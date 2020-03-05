
const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1/Node_9804';

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log('Database connected!');
  })
  .catch(err => {
    console.log('Database connection failed \n', err);
  });

  

module.exports = mongoose;