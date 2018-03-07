'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../lib/db');

var _mongodb = require('mongodb');

class User {

  constructor() {
    this.user_collection = _db.db.get('users');
  }

  createNew(userValues, cb) {
    this.user_collection.insert(userValues, (err, doc) => {
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