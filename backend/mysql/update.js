'use strict'
const query = require("./query");

function update(source, server, offer, price){
  const statement = `UPDATE live SET offer = ?, price = ? WHERE source = ? AND server LIKE ?`;
  const params = [offer, price, source, server];

  query(statement, params).then((result, err)=>{
    if(err) console.log("Update Error");
  })
}

module.exports = update;