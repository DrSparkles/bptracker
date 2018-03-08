import jwt from "jsonwebtoken";

/**
 * Blood Pressure API routes
 * @type {*|exports|module.exports}
 */

const express = require('express');
const router = express.Router();
import usersModule from '../../modules/users';
import authMiddleware from '../../lib/tokenAuth.middleware';
import authConfig from "../../config/auth.config";
import getResponseJSON from "../../lib/response_object";

/**
 * OPEN ROUTES
 */
router.route('/authenticate')
  .post((req, res) => {
    const { body } = req;
    console.log("ROUTES USERS body", body);
    usersModule.authenticate(body, (err, docs) => {
      return res.json(docs);
    });
  });

router.route('/')
  .post((req, res) => {
    const { body } = req;
    usersModule.createNew(body, (err, docs) => {
      return res.json(docs);
    });
  });


/**
 * APPLY AUTH MIDDLEWARE; ALL FOLLOWING ROUTES ARE PROTECTED
 */
router.use(authMiddleware);

/**
 * Routes at /api/users
 */
router.route('/user')
  .get((req, res) => {
    const userToken = req.get('x-access-token');
    usersModule.getUserByToken(userToken, (err, docs) => {
      return res.json(docs);
    });
  });

router.route('/all')
  .get((req, res) => {
    usersModule.getAll((err, docs) => {
      console.log(err);
      if (err){
        return res.status(400).json(docs);
      }
      return res.json(docs);
    });
  });

module.exports = router;