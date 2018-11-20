// const db = require('./index.js');
// const path = require('path');

// const seed = () => (
// db.query(`COPY courses (name, average_rating, regular_price, sales_price, purchase_count, lecture_time, last_update_month, last_update_year, image_url) FROM `${path.join(__dirname, '../courses.tsv')}` DELIMITER '\t'`)
// );

// seed();

\COPY courses (name, average_rating, regular_price, sales_price, purchase_count, lecture_time, last_update_month, last_update_year, image_url) FROM '/Users/leemur/Documents/U-Data/students-also-bought-service/sdc/courses.tsv' WITH (FORMAT CSV, DELIMITER E'\t');