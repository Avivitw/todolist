const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
console.log(dbParams);
const db = new Pool(dbParams);
db.connect();

module.exports = db;
