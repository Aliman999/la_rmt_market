'use strict'
const query = require("./query");
const moment = require("moment");

function update(source, server, offer, price){
  const statement = `UPDATE live SET timestamp = ?, offer = ?, price = ? WHERE source = ? AND server LIKE ?;`;
  const params = [moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), offer, price, source, server];

  query(statement, params).then((result, err)=>{
    if(err) console.log("Update Error");
  })
}

module.exports = update;