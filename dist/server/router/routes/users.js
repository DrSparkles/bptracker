'use strict';

var _users = require('../../modules/users');

var _users2 = _interopRequireDefault(_users);

var _tokenAuth = require('../../lib/tokenAuth.middleware');

var _tokenAuth2 = _interopRequireDefault(_tokenAuth);

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

router.route('/').post((req, res) => {
  const { body } = req;
  _users2.default.createNew(body, (err, docs) => {
    return res.json(docs);
  });
});

// apply auth middleware
router.use(_tokenAuth2.default);

/**
 * Routes at /api/user
 */
router.route('/').get((req, res) => {
  _users2.default.getAll((err, docs) => {
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