'use strict'
const config = require("./config/config");
const scripts = require("./scripts/index");
const restify = require('restify');

const scan = require("./scan/index");
const cors = require("cors");

const fs = require('fs');

const server = restify.createServer({
  name: 'la_rmt',
  version: '1.0.0',
  certificate: config.Env == "test" ? null : fs.readFileSync('/etc/letsencrypt/live/ws.mobitracker.co/fullchain.pem'),
  key: config.Env == "test" ? null : fs.readFileSync('/etc/letsencrypt/live/ws.mobitracker.co/privkey.pem'),
});

scan();

let timer = setInterval(()=>{
  scan(config.Env == "test" ? false : true);
}, (1000*30)*60);

server.use(restify.plugins.queryParser());
server.use(cors({ origin: '*' }));

server.get("/rmt/:type/all", scripts.selectAll);
server.head("/rmt/:type/all", scripts.selectAll);

server.get("/rmt/historical/:server", scripts.selectServer);
server.head("/rmt/historical/:server", scripts.selectServer);

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});