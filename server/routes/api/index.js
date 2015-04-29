'use strict';

var express = require('express');
var ideas = require('./idea.controller');
var person = require('./person.controller');

var router = express.Router();

router.get('/ideas/', ideas.index);
router.get('/idea/:id', ideas.idea);
router.post('/idea', ideas.create);
router.put('/idea/:id/vote', ideas.idea);

router.get('/person/:id', person.person);
router.put('/person/:id/vote', person.vote);

module.exports = router;
