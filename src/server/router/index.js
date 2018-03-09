/**
 * Set up the various sub routes of the application loaded by route "section" such as bp or users
 * @param app
 */
module.exports = function(app){

  app.use('/api/bp', require('./routes/bp'));
  app.use('/api/users', require('./routes/users'));

};