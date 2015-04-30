'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors'),
  favicon = require('serve-favicon'),
  multer = require('multer');

var app = express();

app.set('port', 3002);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({
  dest: 'dist/assets/videos/'
  //rename: function (fieldname, filename) {
  //  return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
  //}
}));

app.use(express.static('dist', {maxAge: 86400000}));
app.use(favicon('dist/favicon.ico'));

require('./routes')(app);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
