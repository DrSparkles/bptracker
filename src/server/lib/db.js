import dbConfig from '../config/db.config';
import mongo from 'mongodb';
import monk from 'monk';
import getResponseJSON from "./response_object";

export const db = monk(dbConfig.connection);

export function getIdFromJSON(_id){
  return db.id(_id._id);
}

export function returnSimpleResult(err, doc, cb){
  if (err){
    return cb(err, getResponseJSON(err, true));
  }

  return cb(null, getResponseJSON(doc));
}