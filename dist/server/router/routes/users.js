'use strict';

var _users = require('../../modules/users');

var _users2 = _interopRequireDefault(_users);

var _response_object = require('../../lib/response_object');

var _response_object2 = _interopRequireDefault(_response_object);

var _auth = require('../../config/auth.config');

var _auth2 = _interopRequireDefault(_auth);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Blood Pressure API routes
 * @type {*|exports|module.exports}
 */

const express = require('express');
const router = express.Router();


// open routes
router.route('/authenticate').post((req, res) => {
  const { body } = req;
  _users2.default.authenticate(body, (err, docs) => {
    return res.json(docs);
  });
});

// route middleware to verify a token
router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, _auth2.default.secret, function (err, decoded) {
      if (err) {
        return res.json((0, _response_object2.default)("Failed authentication", true));
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // bounce if no token
    return res.status(403).send((0, _response_object2.default)("No token provided.", true));
  }
});

/**
 * Routes at /api/user
 */
router.route('/').get((req, res) => {
  _users2.default.getAll((err, docs) => {
    return res.json(docs);
  });
}).post((req, res) => {
  const { body } = req;
  _users2.default.createNew(body, (err, docs) => {
    return res.json(docs);
  });
});

/*




router.route('/')
  .get((req, res) => {
    usersModule.getAll((err, docs) => {
      return res.json(docs);
    });
  })
  .post((req, res) => {
    const { body } = req;
    usersModule.createNew(body, (err, docs) => {
      return res.json(docs);
    });
  });

router.route('/:_id')
  .get((req, res) => {
    const search = req.params;
    usersModule.getByValue(search, (err, docs) => {
      return res.json(docs);
    });

  })
  .delete((req, res) => {
    const _id = req.params;
    usersModule.deleteEntry(_id, (err, docs) => {
      return res.json(docs);
    });
  })
  .put((req, res) => {
    const _id = req.params;
    const update = req.body;
    usersModule.editEntry(_id, update, (err, docs) => {
      return res.json(docs);
    });
  });
*/
module.exports = router;