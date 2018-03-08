import dbConfig from '../config/db.config';
import mongo from 'mongodb';
import monk from 'monk';

export const db = monk(dbConfig.connection);

export function getIdFromJSON(_id){
  return db.id(_id._id);
}

export function getId(id){
  return db.id(id);
}

function getResponseJSON(values, isError = false){
  return {
    error: isError,
    result: values
  };
}

export function errorHandler(err, res) {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: err
  });
}

/**
 * Error will either be a custom string, an array of error strings, or an error object passed from some action.
 * If it's a string or array, create a new error, set the status, and return via callback
 * else just pass the error on to the callback with a status attached.
 * @param err
 * @param status
 * @param cb
 * @returns {*}
 */
export function returnSimpleError(err, status, cb){
  if (typeof err === "function"){
    err.status = status;
    return cb(err);

  }
  else {
    const error = Error(err);
    error.status = status;
    return cb(error);
  }
}

export function returnSimpleResult(err, doc, cb){
  if (err){
    return cb(returnSimpleError(err));
  }

  return cb(null, getResponseJSON(doc));
}