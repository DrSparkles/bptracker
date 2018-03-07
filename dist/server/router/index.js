'use strict';

/**
 * Set up the various sub routes of the application
 * @param app
 */
module.exports = function (app) {

  app.use('/api/bp', require('./routes/bp'));
};