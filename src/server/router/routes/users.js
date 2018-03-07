/**
 * Blood Pressure API routes
 * @type {*|exports|module.exports}
 */

const express = require('express');
const router = express.Router();
import usersModule from '../../modules/users';
import getResponseJSON from "../../lib/response_object";
import authConfig from '../../config/auth.config';
import jwt from 'jsonwebtoken';

// open routes
router.route('/authenticate')
  .post((req, res) => {
    const { body } = req;
    usersModule.authenticate(body, (err, docs) => {
      return res.json(docs);
    });
  });

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, authConfig.secret, function(err, decoded) {
      if (err) {
        return res.json(getResponseJSON("Failed authentication", true));
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  }
  else {
    // bounce if no token
    return res.status(403).send(getResponseJSON("No token provided.", true));
  }
});

/**
 * Routes at /api/user
 */
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