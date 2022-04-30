'use strict'
const select = require("../mysql/select");

function selectAll(req, res, next) {
  const { server } = req.params;

  let data = [];

  select({ server: server, historical: true }).then((result, err) => {
    if (err) console.log(err);
    
    data = result;

    select({ server: server }).then((result, err) => {
      if (err) console.log(err);

      data.push(...result);

      res.send(data);
      next();
    })
  });
}

module.exports = selectAll;