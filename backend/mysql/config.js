'use strict'
const config = require('../config/config');

const mysql = require('mysql2');

const connection = mysql.createPool({
  host: config.MysqlHost,
  user: config.MysqlUsername,
  password: config.MysqlPassword,
  database: config.MysqlDatabase,
  multipleStatements: true
});

module.exports = connection;