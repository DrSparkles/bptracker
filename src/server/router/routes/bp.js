/**
 * Blood Pressure API routes
 * @type {*|exports|module.exports}
 */

var express = require('express');
var router = express.Router();
import bpModule from '../../modules/bp';

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

module.exports = router;