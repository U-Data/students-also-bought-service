const {Client} = require('pg');

const client = new Client({
  user: 'leemur', //mac username
  host: 'localhost',
  database: 'udata', //mac username
  password: '',
  port: 5432, //default postgres port
});

client.connect();

console.log('hi');

module.exports = client;