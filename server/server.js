var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors');

var app = express();

app.set('port', 3002);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));

require('./routes')(app);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
