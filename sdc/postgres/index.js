const {Client} = require('pg');
var _ = require('underscore');
// var promise = require('bluebird');

var client = new Client({
  user: 'postgres', //mac username
  host: 'ec2-13-52-79-139.us-west-1.compute.amazonaws.com', //postgres ec2 link
  database: 'udata', //mac username
  password: '123',
  port: 5432, //default postgres port
});

client.connect();

// var options = {
//   // Initialization Options
//   promiseLib: promise
// };

// var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://localhost:5432/courses/:courseId';
// var client = pgp(connectionString);

client = require('bluebird').promisifyAll(client);

console.log('hi');


const getStudentsPurchasesByCourseId = function(courseId) {
  return client.queryAsync('SELECT student_id from Purchases where course_id = $1', [courseId]);
};

// const getSimilarCourseInfoFromCourseID = function(courseId) {
//   return client.queryAsync('SELECT * from Courses where id = $1', [courseId]);
// }

const getPurchasesForStudent = function(studentId) {
  return client.queryAsync('SELECT Courses.id, Courses.name, Courses.average_rating, Courses.regular_price, Courses.sales_price, Courses.purchase_count, Courses.lecture_time, Courses.last_update_month, Courses.last_update_year, Courses.image_url from Purchases INNER JOIN Courses ON Purchases.course_id = Courses.id where student_id = $1', [studentId]);
};

const deleteCourseForStudent = function(courseId) {
  return client.queryAsync('DELETE from Purchases WHERE courseId = $1', [courseId]);
};

const arrayOfPurchasesForStudents = function(courseId, callback) {
  return getStudentsPurchasesByCourseId(courseId) //gets student_id from Purchases table
  .then(function(courseId) {
    console.log('this is courseID', courseId.rows)
    return courseId.rows.map(
      function(studentObj) {
      console.log('purchases for students ', getPurchasesForStudent(studentObj.student_id), studentObj.student_id)
        return getPurchasesForStudent(studentObj.student_id)
      })
    })
  .then(function(val) {
    console.log('this is the promises ', val);
    // return val;
    var results = {};
    console.log("HERE", val)
    Promise.all(val)
      .then(function(rows) {
        // console.log(rows);
        console.log('this is the array of course_id objects ', rows);
        results.rows = rows;
        console.log('this is results ', rows);
        console.log({ rows })
        return rows.map(
        function(courseObj) {
          var output = [];
          console.log('this is courseObj', courseObj);
          for (var i = 0; i < courseObj.rows.length; i++) {
              output.push(courseObj.rows[i]);
              // console.log('check if interpreter reads this line')
          }
          return output
        })
      })
      .then(function(data) {
        var flattenData = _.flatten(data);
        console.log('this is the flattened data', flattenData);
        var uniqCourses = _.uniq(flattenData, function(x) {return x.id});
        console.log('this is the list of uniq courses ', uniqCourses);
        callback(null, uniqCourses);
      })
      .catch(err => { 
        callback(err);
      })
  })
  .catch(error => {
    callback(error);
  })
}

let inputStudentInfo = function(studentObj, callback) {
  const {
    coursesCount, reviewsCount
  } = studentObj;
  var query = 'INSERT into Students (courses_count, reviews_count) VALUES ($1, $2)';
  client.query(query, [coursesCount, reviewsCount], function (error, results) {
      callback(error, results);
  });
};

// module.exports = client;

module.exports = {
  client: client,
  arrayOfPurchasesForStudents: arrayOfPurchasesForStudents,
  deleteCourseForStudent: deleteCourseForStudent,
  inputStudentInfo: inputStudentInfo
};