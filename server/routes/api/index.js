'use strict';
var express = require('express');
var ideas = require('./idea.controller');
var person = require('./person.controller');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();

router.get('/ideas/', ideas.index);
router.get('/idea/:id', ideas.idea);
router.post('/idea', ideas.create);
router.put('/idea/:id/vote', ideas.vote);

router.get('/person/:id', person.person);
router.put('/person/:id/vote', person.vote);

router.post('/person/:id/video',
  [multer
  (
    {
      dest: './uploads/',
      changeDest: function (dest, req, res) {
        var newDestination = dest + req.params.id;
        console.log(newDestination);
        var stat = null;
        try {
          stat = fs.statSync(newDestination);
        } catch (err) {
          fs.mkdirSync(newDestination);
        }
        if (stat && !stat.isDirectory()) {
          throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }
        return newDestination
      }
    }),
    function (req, res) {
      console.log(req.body) // form fields
      console.log(req.files) // form files
      res.status(204).end()
    }]);

module.exports = router;
