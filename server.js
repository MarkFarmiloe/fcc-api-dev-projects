'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

app.get('/', function (req, res) {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), function (err, text) {
    if (err) {
      res.writeHead(500);
      res.end();      
    } else {
      res.writeHead(200, { 'content-type': 'text/html'});
      res.end(text);
    }
  });
});

app.get('/:data', function (req, res) {
  var dateData = req.params.data;
  var obj = { unix: null, natural: null };
  var dt = new Date(dateData);
  if (isNaN(dt)) {
    dt = new Date(Number(dateData) * 1000);
  }
  if (isNaN(dt)){
    res.end(JSON.stringify(obj));
  } else {
    obj = { unix: dt.getTime() / 1000, natural: dt.toDateString() };
    res.end(JSON.stringify(obj));
  }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
