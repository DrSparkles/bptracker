'use strict';

var _bp = require('../../modules/bp');

var _bp2 = _interopRequireDefault(_bp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Blood Pressure API routes
 * @type {*|exports|module.exports}
 */

var express = require('express');
var router = express.Router();


/**
 * Routes at /api/user
 */
router.route('/').get((req, res) => {
  _bp2.default.getAll((err, docs) => {
    return res.json(docs);
  });
}).post((req, res) => {
  const { body } = req;
  _bp2.default.createNew(body, (err, docs) => {
    return res.json(docs);
  });
});

/*
router.route('/')
  .get((req, res) => {
    bpModule.getAll((err, docs) => {
      return res.json(docs);
    });
  })
  .post((req, res) => {
    const { body } = req;
    bpModule.createNew(body, (err, docs) => {
      return res.json(docs);
    });
  });

router.route('/:_id')
  .get((req, res) => {
    const search = req.params;
    bpModule.getByValue(search, (err, docs) => {
      return res.json(docs);
    });

  })
  .delete((req, res) => {
    const _id = req.params;
    bpModule.deleteEntry(_id, (err, docs) => {
      return res.json(docs);
    });
  })
  .put((req, res) => {
    const _id = req.params;
    const update = req.body;
    bpModule.editEntry(_id, update, (err, docs) => {
      return res.json(docs);
    });
  });
*/
module.exports = router;