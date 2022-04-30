'use strict'
const connection = require("./config");

function query(query, params) {
  return new Promise((callback, reject) => {
    connection.query(
      query,
      params,
      (err, results, fields) => {
        if (err) reject(err);
        callback(results);
      }
    )
  })
}

module.exports = query;