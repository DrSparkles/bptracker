/**
 * Blood Pressure API routes
 * @type {*|exports|module.exports}
 */

const express = require('express');
const router = express.Router();
import usersModule from '../../modules/users';
import authMiddleware from '../../lib/tokenAuth.middleware';

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