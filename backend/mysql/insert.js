'ust strict'
const query = require("./query");

function insert(datetime, source, server, region, subRegion, offer, price){
  const statement = `INSERT INTO live (timestamp, source, server, region, subRegion, offer, price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [datetime, source, server, region, subRegion, offer, price];
  query(statement, params).then((result, err)=>{
    if(err) console.log("Insertion Error");
  });
}

module.exports = insert;