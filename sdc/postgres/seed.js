const path = require('path');
const db = require('./index.js');

async function seed() {
  await db.query(`CREATE TABLE IF NOT EXISTS Courses`)

  await db.query(`COPY tablename (column names) FROM `${path.join(__dirname, './courses.csv')}` WITH (FORMAT csv);`)

  db.end()

}