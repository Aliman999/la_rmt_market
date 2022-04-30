'use strict'
const scripts = require("./scripts/index");
const scan = require("./scan/index");
const restify = require('restify');
const cors = require("cors");

const fs = require('fs');

const server = restify.createServer({
  name: 'mobitracker',
  version: '1.0.0',
  certificate: fs.readFileSync('/etc/letsencrypt/live/ws.mobitracker.co/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/ws.mobitracker.co/privkey.pem'),
});

scan();

let timer = setInterval(()=>{
  scan(true);
}, (1000*30)*60);

server.use(restify.plugins.queryParser());
server.use(cors({ origin: 'http://localhost:3000' }));

server.get("/v1/rmt/:type/all", scripts.selectAll);
server.head("/v1/rmt/:type/all", scripts.selectAll);

server.get("/v1/rmt/historical/:server", scripts.selectServer);
server.head("/v1/rmt/historical/:server", scripts.selectServer);

server.get("/v1/rmt/test", (req, res, next) => {
  res.send("Success");
  next();
});
server.head("/v1/rmt/test", (req, res, next) => {
  res.send("Success");
  next();
});

server.listen(2599, function () {
  console.log('%s listening at %s', server.name, server.url);
});