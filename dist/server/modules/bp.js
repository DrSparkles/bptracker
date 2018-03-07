'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../lib/db');

var _mongodb = require('mongodb');

class BP {

  constructor() {
    this.bp_collection = _db.db.get('bp_records');
  }

  createNew(bpValues, cb) {

    this.bp_collection.insert(bpValues, (err, doc) => {
      return (0, _db.returnSimpleResult)(err, doc, cb);
    });
  }

  getAll(cb) {
    this.bp_collection.find({}, (err, doc) => {
      return (0, _db.returnSimpleResult)(err, doc, cb);
    });
  }

  getByValue(searchTerms, cb) {

    // make sure we're searching on the correct item type
    if (searchTerms._id != 'undefined') {
      searchTerms._id = new _mongodb.ObjectID(searchTerms._id);
    }

    this.bp_collection.find(searchTerms, (err, doc) => {
      return (0, _db.returnSimpleResult)(err, doc, cb);
    });
  }

  deleteEntry(_id, cb) {
    // get our mongo id to replace the id as string
    const query = { _id: (0, _db.getIdFromJSON)(_id) };
    this.bp_collection.remove(query, (err, doc) => {
      return (0, _db.returnSimpleResult)(err, doc, cb);
    });
  }

  editEntry(_id, updateValues, cb) {
    const query = { _id: (0, _db.getIdFromJSON)(_id) };
    this.bp_collection.update(query, updateValues, (err, doc) => {
      return (0, _db.returnSimpleResult)(err, doc, cb);
    });
  }

}

exports.default = new BP();