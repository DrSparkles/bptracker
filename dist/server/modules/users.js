'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../lib/db');

var _auth = require('../config/auth.config');

var _auth2 = _interopRequireDefault(_auth);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User {

  constructor() {
    this.user_collection = _db.db.get('users');
  }

  createNew(userValues, cb) {
    const { username, password } = userValues;

    // make sure our values are set
    if (username == undefined || username == "" || password == undefined || password == "") {
      return (0, _db.returnSimpleResult)("Username and password must not be blank.", {}, cb);
    }

    // make sure the user is unique
    this.user_collection.find({ username }, (err, userDoc) => {
      if (err) return (0, _db.returnSimpleResult)(err, doc, cb);

      if (userDoc.length) {
        return (0, _db.returnSimpleResult)("That username already exists; please try another!", {}, cb);
      }

      // save our user with hashed password
      let hash = _bcrypt2.default.hashSync(password, 10);
      this.user_collection.insert({ username, password: hash }, (err, doc) => {
        return (0, _db.returnSimpleResult)(err, doc, cb);
      });
    });
  }

  authenticate(userValues, cb) {

    const { username, password } = userValues;
    console.log("TRYING TO AUTHENTICATE");
    console.log("auth username", username);
    console.log("auth password", password);
    // make sure our values are set
    if (username == undefined || username == "" || password == undefined || password == "") {
      return (0, _db.returnSimpleResult)("Username and password must not be blank.", {}, cb);
    }

    this.user_collection.findOne({ username }, (err, userDoc) => {
      if (err) return (0, _db.returnSimpleResult)(err, doc, cb);

      if (!userDoc) {
        return (0, _db.returnSimpleResult)("User " + username + " not found.", {}, cb);
      }

      if (_bcrypt2.default.compareSync(password, userDoc.password)) {

        const payload = {
          username
        };

        const token = _jsonwebtoken2.default.sign(payload, _auth2.default.secret);
        console.log("SERVER USERS: LOGGED IN, PASSING BACK TOKEN");
        return (0, _db.returnSimpleResult)(err, { token }, cb);
      } else {
        return (0, _db.returnSimpleResult)("Password does not match our records.", {}, cb);
      }
    });
  }

  getUserByToken(userToken, cb) {
    const payload = _jsonwebtoken2.default.decode(userToken);
    return this.getUserByUsername(payload, cb);
  }

  getUserByUsername(username, cb) {
    this.user_collection.findOne({ username: username.username }, ['_id', 'username'], (err, user) => {
      return (0, _db.returnSimpleResult)(err, { user }, cb);
    });
  }

  getAll(cb) {

    this.user_collection.find({}, ["_id", "username"], (err, docs) => {
      return (0, _db.returnSimpleResult)(err, docs, cb);
    });
  }

  searchByUsername(username, cb) {
    this.user_collection.find({ username }, (err, userDoc) => {
      const doc = { _id: userDoc._id, username: userDoc.username };
      return (0, _db.returnSimpleResult)(err, doc, cb);
    });
  }

  /*
  
  
    createNew(userValues, cb){
  
      this.user_collection.insert(userValues, (err, doc) => {
        return returnSimpleResult(err, doc, cb);
      });
  
    }
  
    getByValue(searchTerms, cb){
  
      // make sure we're searching on the correct item type
      if (searchTerms._id != 'undefined'){
        searchTerms._id = new ObjectID(searchTerms._id);
      }
  
      this.user_collection.find(searchTerms, (err, doc) => {
        return returnSimpleResult(err, doc, cb);
      });
    }
  
    deleteEntry(_id, cb){
      // get our mongo id to replace the id as string
      const query = {_id: getIdFromJSON(_id)};
      this.user_collection.remove(query, (err, doc) => {
        return returnSimpleResult(err, doc, cb);
      });
    }
  
    editEntry(_id, updateValues, cb){
      const query = {_id: getIdFromJSON(_id)};
      this.user_collection.update(query, updateValues, (err, doc) => {
        return returnSimpleResult(err, doc, cb);
      });
    }
  */
}

exports.default = new User();