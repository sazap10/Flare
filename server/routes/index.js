/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  // Insert routes below
  app.use('/api', require('./api'));

  // All other routes should redirect to the index.html
  app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
  });

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, { message: err.message });
  });
};
