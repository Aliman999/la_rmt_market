'use strict'
const select = require("../mysql/select");

function selectAll(req, res, next) {
  const { type } = req.params;

  if(type != "historical" && type != "live"){
    res.send("Invalid data source");
    next();
  }

  select({ historical: type == "historical" ? true : false }).then((result, err) => {
    if (err) console.log(err);

    res.send(result);
    next();
  });
}

module.exports = selectAll;