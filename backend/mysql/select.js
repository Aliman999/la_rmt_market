'use strict'
const rate = require("../params/rate");

const query = require("./query");

function select(data = { source: null, server: null, region: null, subRegion: null, price: null, historical: false }, compare = { offer: "=", price: "=" }){
  return new Promise((callback, reject) => {
    if(!compare.offer){
      compare.offer = "=";
    }
    if(!compare.price){
      compare.price = "=";
    }

    const dataValues = Object.keys(data).filter((key) => {
      if(key == "historical"){
        return false;
      }
      return true;
    })
    .map((key) => data[key]);

    const dataKeys = Object.keys(data).filter((key) => {
      if(key == "historical"){
        return false;
      }
      return true;
    })
    .map((key) => key);

    let statement = `SELECT *`;
    const params = dataValues;

    if (data.historical) {
      statement += " FROM historical";
    } else {
      statement += " FROM live";
    }

    if (params.length > 0) {
      statement += " WHERE ";
    } else {
      statement += ";";
    }

    params.forEach((item, i) => {
      if (i == params.length - 1) {
        if((dataKeys[i] == "offer" && compare[dataKeys[i]] != "=") || (dataKeys[i] == "price" && compare[dataKeys[i]] != "=")){
          statement += `${dataKeys[i]} ${compare[dataKeys[i]]} ?`;
        } else if (dataKeys[i] == "price" && compare[dataKeys[i]] == "="){
          statement += `ROUND(${dataKeys[i]}, 10) = ROUND(?, 10)`
        } else{
          statement += `${dataKeys[i]} = ?`;
        }
      } else {
        if ((dataKeys[i] == "offer" && compare[dataKeys[i]] != "=") || (dataKeys[i] == "price" && compare[dataKeys[i]] != "=")) {
          statement += `${dataKeys[i]} ${compare[dataKeys[i]]} ? AND `;
        } else if (dataKeys[i] == "price" && compare[dataKeys[i]] == "="){
          statement += `ROUND(${dataKeys[i]}, 10) = ROUND(?, 10) AND `
        } else {
          statement += `${dataKeys[i]} = ? AND `;
        }
      }
    });

    query(statement, params).then(async (result, err)=>{
      if (err) reject(err);

      for(let i = 0; i < result.length; i++){
        result[i].price = result[i].price*(rate.CAD_USD);
      }

      callback(result);
    });
  })
}

module.exports = select;