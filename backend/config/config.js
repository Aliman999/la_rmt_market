'use strict'
require('dotenv').config({ path: __dirname + '/.env' });

const config = {
  MysqlHost: process.env.MYSQL_HOST,
  MysqlUsername: process.env.MYSQL_USERNAME,
  MysqlPassword: process.env.MYSQL_PASSWORD,
  MysqlDatabase: process.env.MYSQL_DATABASE,
  Key: process.env.KEY,
  Secret: process.env.SECRET,
  Quick: process.env.QUICK,
  Full: process.env.FULL,
  Env: process.env.DEV_ENVIRONMENT,
};

console.log(config);

module.exports = config;