import dbConfig from '../config/db.config';
import mongo from 'mongodb';
import monk from 'monk';
import getResponseJSON from "./response_object";

export const db = monk(dbConfig.connection);

export function getIdFromJSON(_id){
  return db.id(_id._id);
}

export function getId(id){
  return db.id(id);
}

export function returnSimpleResult(err, doc, cb){
  console.log("DB RETURNSIMPLERESULT err", err);
  console.log("DB RETURNSIMPLERESULT doc", doc);
  if (err){
    return cb(err, getResponseJSON(err, true));
  }

  return cb(null, getResponseJSON(doc));
}