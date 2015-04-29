/**
 * Created by sachin on 29/04/2015.
 */
'use strict';

var fs = require('fs');

// Gets the person.
exports.person = function(req, res) {
  res.send('single person');
};

// Votes for the person
exports.vote = function(req, res) {
  res.send('vote person');
};
