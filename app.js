
const express = require('express');
// const mysql = require('mysql');
// const mongodb = require('mongodb');
const app = express();


// Authentication

  // JWT


/**
 * Application middlewares
 */
require('./middlewares')(app);



// ODM Mongoose
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/Node_9804', { useNewUrlParser: true, useUnifiedTopology: true });


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//   // we're connected!
//   console.log('CONNECTED');
// });




// const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
// const url = 'mongodb://localhost:27017';
 
// Database Name
// const dbName = 'Node_9804';
 
// Use connect method to connect to the server
// MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
//   console.log("Connected successfully to server");
 
//   const db = client.db(dbName);

//   db
//     .collection('students')
//     .findOne({
//       family: 'test'
//     })
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     })
//     .finally(done => console.log(done));
 
//   // client.close();
// });





// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'sakila'
// });
 
// connection.connect();



// app.get('/user-list/:letter', function(req, res){
//   const { letter } = req.params;
//   connection.query(`SELECT * FROM actor_info WHERE last_name LIKE ?`, [letter + '%'], function (error, results) {
//     if (error) throw error;
//     res.send(results);
//   });
// });


// app.get('/film-info/:id', function(req, res){
//   const { id } = req.params;
//   connection.query(`SELECT film_info FROM actor_info WHERE actor_id = ?`, [id], function (error, results) {
//     if (error) throw error;
//     res.send(results);
//   });
// });



/**
 * Application routes
 */
require('./routes')(app);


/**
 * Error handlers
 */
require('./services/errorHandlers')(app);


module.exports = app;

app.listen(8080)
// https://docs.mongodb.com/manual/reference/sql-comparison/

// DATABASE
  // Relational
    // SQL Server
    // MySQL
    // Oracle
    // Postgres
    // SQLite
    // DB2
    // ...
  // NoSQL
    // MongoDB
    // Casandra
    // Elastic
    // ...
  // Document-based
   // Redis

  // Graph

  // ... 


// db.getCollection('video_movieDetails').find({})

// db
//   .getCollection('video_movieDetails')
//   .find(
//     {
//       "imdb.rating": {
//         $lt: 5
//       }
//     },
//     {
//       "_id": 0,
//       "title": 1,
//       "imdb.rating": 1
//     }
//   )

