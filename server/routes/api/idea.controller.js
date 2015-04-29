'use strict';

var fs = require('fs');

// Get list of ideas
exports.index = function (req, res) {
  fs.readFile('./server/data/ideas.json', function (err, data) {
    if (err) {
      console.log("Error reading file " + err);
      res.status(500).send("Error reading file ");
      return;
    }
    res.json(JSON.parse(data));
  });
};


// Get specific idea
exports.idea = function (req, res) {
  var id = req.params.id;
  fs.readFile('./server/data/ideas.json', function (err, data) {
    if (err) {
      console.log("Error reading file " + err);
      res.status(500).send("Error reading file ");
      return;
    }
    var ideas = JSON.parse(data);
    var idea = findIdeaById(id, ideas, false);
    if (idea) {
      res.json(idea);
    } else {
      res.status(400).send("No idea found");
    }
  });
};

// Create new idea
exports.create = function (req, res) {
  var idea = {
    video: req.body.video,
    summary: req.body.summary,
    content: req.body.content,
    votesPos: 0,
    votesNeg: 0
  };
  fs.readFile('./server/data/ideas.json', function (err, data) {
    if (err) {
      console.log("Error reading file " + err);
      res.status(500).send("Error reading file");
      return;
    }
    var ideas = JSON.parse(data);
    idea.id = findMaxId(ideas) + 1;
    ideas.push(idea);
    fs.writeFile('./server/data/ideas.json', JSON.stringify(ideas), function (err) {
      if (err) {
        console.log("Error writing file " + err);
        res.status(500).send("Error writing file");
        return;
      }
      console.log('Saved Idea');
      res.sendStatus(201);
    });
  });

};

// vote on specific idea
exports.vote = function (req, res) {
  var id = req.params.id;
  var vote = parseInt(req.body.vote);
  fs.readFile('./server/data/ideas.json', function (err, data) {
    if (err) {
      console.log("Error reading file " + err);
      res.status(500).send("Error reading file");
      return;
    }
    var ideas = JSON.parse(data);
    var idea = findIdeaById(id, ideas, true);
    if (idea !== false) {
      if (vote === 1) {
        ideas[idea].votesPos = ideas[idea].votesPos + 1;
      } else if (vote === -1) {
        ideas[idea].votesNeg = ideas[idea].votesNeg + 1;
      }
      console.log(ideas[idea]);
      fs.writeFile('./server/data/ideas.json', JSON.stringify(ideas), function (err) {
        if (err) {
          console.log("Error writing file " + err);
          res.status(500).send("Error writing file");
          return;
        }
        console.log('Saved Ideas');
        res.sendStatus(200);
      });
    } else {
      res.status(400).send("No idea found");
    }
  });
};

function findIdeaById(id, ideas, index) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === parseInt(id)) {
      if (index) {
        return i;
      } else {
        return ideas[i];
      }
    }
  }
  return false;
}

function findMaxId(ideas) {
  var max = -1;
  for (var i = 0; i < ideas.length; i++) {
    var id = ideas[i].id;
    max = id > max ? id : max;
  }
  return max;
}

