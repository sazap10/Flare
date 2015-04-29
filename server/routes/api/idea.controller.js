'use strict';

var fs = require('fs');

// Get list of ideas
exports.index = function(req, res, next) {
  res.send('ideas index');
};


// Get list of ideas
exports.idea = function(req, res, next) {
  res.send('single idea');
};

// Get list of ideas
exports.create = function(req, res, next) {
  res.send('create idea');
};

// Get list of ideas
exports.vote = function(req, res, next) {
  res.send('vote idea');
};
