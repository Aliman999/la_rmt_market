'ust strict'
const query = require("./query");
const moment = require("moment");

function insert(source, server, region, subRegion, offer, price){
  const statement = `INSERT INTO live (timestamp, source, server, region, subRegion, offer, price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), source, server, region, subRegion, offer, price];
  query(statement, params).then((result, err)=>{
    if(err) console.log("Insertion Error");
  });
}

module.exports = insert;