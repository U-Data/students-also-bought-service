const faker = require('faker');
const path = require('path');
const fs = require('fs');

var photos = require('../database/photoData.js');
var courses = require('../database/courseData.js');

const randomNumGenerator = function(min, max, decimalPlaces) {
  var rand = (Math.random() * (max - min)) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

const streamCourse = fs.createWriteStream(path.join(__dirname, 'courses.tsv'));
const fakeCourseData = (i) => {
  for (;i <= 10000000; i++) {
    let id = i;
    let courseName = courses[randomNumGenerator(0, courses.length, 0)]; 
    let rand_average_rating = randomNumGenerator(1, 5, 1);
    let rand_regular_price = randomNumGenerator(50, 200, 0);
    let rand_sales_price = randomNumGenerator(10, 20, 0);
    let rand_purchase_count = randomNumGenerator(30, 500, 0);
    let rand_lecture_time = randomNumGenerator(5, 30, 1);
    let rand_update_month = randomNumGenerator(1, 12, 0);
    let rand_update_year = randomNumGenerator(2016, 2018, 0);
    let rand_image_url = photos[randomNumGenerator(0, photos.length, 0)];
    if (!streamCourse.write(`${id}\t${courseName}\t${rand_average_rating}\t${rand_regular_price}\t${rand_sales_price}\t${rand_purchase_count}\t${rand_lecture_time}\t${rand_update_month}\t${rand_update_year}\t${rand_image_url}\n`)) {
      streamCourse.once('drain', () => {
        fakeCourseData(i + 1);
      });
      return;
    }
  }
  streamCourse.end();
};
fakeCourseData(1);

const streamStudentData = fs.createWriteStream(path.join(__dirname, 'students.tsv'));
const fakeStudentData = (i) => {
  for (; i <= 10000000; i++) {
    let id = i;
    let courses_count = randomNumGenerator(1, 50, 0);
    let reviews_count = randomNumGenerator(1, 50, 0);
    if (!streamStudentData.write(`${id}\t${courses_count}\t${reviews_count}\n`)) {
      streamStudentData.once('drain', () => {
        fakeStudentData(i + 1);
      });
      return;
    }
  }
  streamStudentData.end();
};
fakeStudentData(1);

const streamPurchaseData = fs.createWriteStream(path.join(__dirname, 'purchases.tsv'));
const fakePurchasesData = (i) => {
  for (; i <= 10000000; i++) {
    let rand_student_id = randomNumGenerator(1, 5000000, 0);
    let rand_course_id = randomNumGenerator(1, 9000000, 0);
    if (!streamPurchaseData.write(`${rand_student_id}\t${rand_course_id}\n`)) {
      streamPurchaseData.once('drain', () => {
        fakePurchasesData(i + 1);
      });
      return;
    }
  }
  streamPurchaseData.end();
};
fakePurchasesData(1);