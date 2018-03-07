'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;
exports.getIdFromJSON = getIdFromJSON;
exports.returnSimpleResult = returnSimpleResult;

var _db = require('../config/db.config');

var _db2 = _interopRequireDefault(_db);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var _response_object = require('./response_object');

var _response_object2 = _interopRequireDefault(_response_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = exports.db = (0, _monk2.default)(_db2.default.connection);

function getIdFromJSON(_id) {
  return db.id(_id._id);
}

function returnSimpleResult(err, doc, cb) {
  if (err) {
    return cb(err, (0, _response_object2.default)(err, true));
  }

  return cb(null, (0, _response_object2.default)(doc));
}