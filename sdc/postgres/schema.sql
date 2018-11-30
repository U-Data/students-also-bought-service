DROP DATABASE udata;

CREATE DATABASE udata;

\c udata

DROP TABLE IF EXISTS Courses;

CREATE TABLE IF NOT EXISTS Courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(75),
  average_rating DECIMAL(2,1),
  regular_price DECIMAL(10,2),
  sales_price DECIMAL(10,2),
  purchase_count INT,
  lecture_time DECIMAL(10,1),
  last_update_month INT,
  last_update_year INT,
  image_url VARCHAR(100)
);

DROP TABLE IF EXISTS Students;

CREATE TABLE IF NOT EXISTS Students (
  id SERIAL PRIMARY KEY,
  courses_count INT,
  reviews_count INT
);

DROP TABLE IF EXISTS Purchases;

CREATE TABLE IF NOT EXISTS Purchases (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES Students(id),
  course_id INTEGER REFERENCES Courses(id)
);

\COPY courses (id, name, average_rating, regular_price, sales_price, purchase_count, lecture_time, last_update_month, last_update_year, image_url) FROM '/Users/leemur/Documents/U-Data/students-also-bought-service/sdc/courses.tsv' WITH (FORMAT CSV, DELIMITER E'\t')

\COPY students (id, courses_count, reviews_count) FROM '/Users/leemur/Documents/U-Data/students-also-bought-service/sdc/students.tsv' WITH (FORMAT CSV, DELIMITER E'\t')

\COPY purchases (student_id, course_id) FROM '/Users/leemur/Documents/U-Data/students-also-bought-service/sdc/purchases.tsv' WITH (FORMAT CSV, DELIMITER E'\t')

