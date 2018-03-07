"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getResponseJSON;
function getResponseJSON(values, isError = false) {
  return {
    error: isError,
    result: values
  };
}