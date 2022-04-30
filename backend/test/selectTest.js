'use strict'
const select = require("../mysql/select");

select({ price: 0.001789, offer: 60 }, { offer: ">=", price: "<=" }).then((result, err) => {
  if (err) console.log(err);

  console.log(result);
});