/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

const config   = require('config');
const express  = require('express');
const events   = require('events');
const fs       = require('fs');
const http     = require('http');

let app        = express();
let pubSub     = new events.EventEmitter();

app.get('/listUsers', (req, res) => {
  fs.readFile( __dirname + '/' + 'users.json', 'utf8', (err, data) => {
    res.statusCode = 200;
    res.end(data);
  });
});

const port    = 3000;
const server  = http.createServer(app, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port,  () => {
  console.log(`Server running at port ${port}`);
});

require('./database').init(pubSub);
