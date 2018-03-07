"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authMiddleware;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _response_object = require("./response_object");

var _response_object2 = _interopRequireDefault(_response_object);

var _auth = require("../config/auth.config");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authMiddleware(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log("TOKEN IN MIDDLEWARE", token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, _auth2.default.secret, function (err, decoded) {
      if (err) {
        return res.json((0, _response_object2.default)("Failed authentication", true));
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // bounce if no token
    return res.status(401).send((0, _response_object2.default)("No token provided.", true));
  }
}