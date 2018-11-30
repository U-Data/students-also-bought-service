require('newrelic');
// require express

// let cluster = require('cluster');

// // Code to run if we’re in the master process
// if (cluster.isMaster) {

//   // Count the machine’s CPUs
//   var cpuCount = require('os').cpus().length;

//   // Create a worker for each CPU
//   for (var i = 0; i < cpuCount; i += 1) {
//       cluster.fork();
//   }

// // Code to run if we’re in a worker process
// } else {

var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
// var db = require('../database/index.js');
var db = require('../sdc/postgres/index.js');

var bodyParser = require('body-parser');
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/courses/:courseId", express.static(path.join(__dirname, '../public')));

// GET method route
app.get('/courses/:courseId/similarcourses', function (req, res) {
	console.log(req.params)
  db.arrayOfPurchasesForStudents(req.params.courseId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('get worked')
      res.send(results);
    }
  });
});


// // POST method route
app.post('/input', (req, res) => {
  db.inputStudentInfo(req.body, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send(err);
    } else {
      res.status(201).send();
    }
  });
});

// // UPDATE method route
// app.put('/courses/:courseId/similarcourses', function (req, res) {
//   db.inputNewCourses(req.body.name, req.body.average_rating, req.body.regular_price, req.body.sales_price, (err, results) => {
//     if (err) {
//       res.status(500).send(err, null);
//     } else {
//       res.status(200).send(null, results);
//     }
//   });
// });

// // DELETE method route
// app.delete('/courses/:courseId/similarcourses', function (req, res) {
//   db.deleteCourseForStudent(req.params.courseId, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.send(results);
//     }
//   });
// });

app.listen(3004, () => { console.log('listening on port', 3004  ); });
// }
