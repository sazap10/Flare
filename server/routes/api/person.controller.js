/**
 * Created by sachin on 29/04/2015.
 */
'use strict';
var jf = require('jsonfile');
var util = require('util');
var fs = require('fs');
var filepath = './';

// Gets the person.
exports.person = function (req, res) {
  /* jf.readFile(filepath+"person.json", function(err, obj) {
   res.send(util.inspect(obj));
   next();
   })*/
  fs.readFile(filepath + 'person.json', 'utf8', function (err, data) {
    var jsondata = JSON.parse(data);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    for (var i = 0; i < jsondata.length; i++) {
      var id = jsondata[i].id;
      if (parseInt(req.params.id) === id)
        res.write(JSON.stringify(jsondata[i]));
    }
    res.end();
  });
};

// Votes for the person
exports.vote = function (req, res) {
  fs.readFile(filepath + 'person.json', 'utf8', function (err, data) {
    var jsondata = JSON.parse(data);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    for (var i = 0; i < jsondata.length; i++) {
      var id = jsondata[i].id;
      if (parseInt(req.params.id) === id) {
        if (parseInt(req.body.vote) < 0)
          jsondata[i].votesNeg = parseInt(jsondata[i].votesNeg) + 1;
        else
          jsondata[i].votesPos = parseInt(jsondata[i].votesPos) + 1;
      }
      console.log(jsondata);
      fs.writeFile(filepath + 'person.json', JSON.stringify(jsondata));
      res.write(JSON.stringify(jsondata));
    }
    res.end();
  });
};

