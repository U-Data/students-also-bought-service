DROP KEYSPACE udata;

CREATE KEYSPACE udata WITH REPLICATION = {
  'class': 'SimpleStrategy', 
  'replication_factor': 1
};

USE udata;

CREATE TABLE IF NOT EXISTS Courses (
  id INT PRIMARY KEY,
  name VARCHAR,
  average_rating FLOAT,
  regular_price FLOAT,
  sales_price FLOAT,
  purchase_count INT,
  lecture_time FLOAT,
  last_update_month INT,
  last_update_year INT,
  image_url VARCHAR
);

COPY courses (id, name, average_rating, regular_price, sales_price, purchase_count, lecture_time, last_update_month, last_update_year, image_url) FROM '/Users/leemur/Documents/U-Data/students-also-bought-service/sdc/courses.tsv' WITH DELIMITER='\t';



