const express = require('express');
const router = express.Router();
import bpModule from '../../modules/bp';
import authMiddleware from "../../lib/tokenAuth.middleware";
import { errorHandler } from "../../lib/db";

/**
 * Blood Pressure API routes; all are protected
 * @type {*|exports|module.exports}
 */

// apply auth middleware
router.use(authMiddleware);

router.route('/')
  .get((req, res) => {

    bpModule.getAll((err, docs) => {
      if (err) return errorHandler(err, res);
      return res.json(docs);
    });
  })
  .post((req, res) => {
    const { body } = req;
    bpModule.createNew(body, (err, docs) => {
      if (err) return errorHandler(err, res);
      return res.json(docs);
    });
  });

router.route('/user/:_id')
  .get((req, res) => {
    const userId = req.params;
    bpModule.getAllForUser(userId._id, (err, docs) => {
      if (err) return errorHandler(err, res);
      return res.json(docs);
    });
  });

router.route('/:_id')
  .get((req, res) => {
    const search = req.params;
    bpModule.getByValue(search, (err, docs) => {
      if (err) return errorHandler(err, res);
      return res.json(docs);
    });

  })
  .delete((req, res) => {
    const _id = req.params;
    bpModule.deleteEntry(_id, (err, docs) => {
      if (err) return errorHandler(err, res);
      return res.json(docs);
    });
  })
  .put((req, res) => {
    const _id = req.params;
    const update = req.body;
    bpModule.editEntry(_id, update, (err, docs) => {
      if (err) return errorHandler(err, res);
      return res.json(docs);
    });
  });

module.exports = router;