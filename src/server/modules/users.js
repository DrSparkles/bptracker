import { db, returnSimpleResult, returnSimpleError, getIdFromJSON } from '../lib/db';
import authConfig from '../config/auth.config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class User {

  constructor(){
    this.user_collection = db.get('users');
  }

  createNew(userValues, cb){
    const { username, password } = userValues;

    // make sure our values are set
    if (username === undefined || username === "" || password === undefined || password === ""){
      return returnSimpleResult("Username and password must not be blank.", {}, cb);
    }

    // make sure the user is unique
    this.user_collection.find({username}, (err, userDoc) => {
      if (err) return returnSimpleResult(err, doc, cb);

      if (userDoc.length){
        return returnSimpleResult("That username already exists; please try another!", {}, cb);
      }

      // save our user with hashed password
      let hash = bcrypt.hashSync(password, 10);
      this.user_collection.insert({username, password: hash}, (err, doc) => {
        return returnSimpleResult(err, doc, cb);
      });
    });

  }

  authenticate(userValues, cb){

    const { username, password } = userValues;

    // make sure our values are set
    if (username == undefined || username == "" || password == undefined || password == ""){
      return returnSimpleError("Username and password must not be blank.", 400, cb);
    }

    this.user_collection.findOne({username}, (err, userDoc) => {
      if (err) return returnSimpleResult(err, doc, cb);

      if (!userDoc) return returnSimpleError("User " + username + " not found.", 400, cb);


      if(bcrypt.compareSync(password, userDoc.password)) {

        const payload = {
          username
        };

        const token = jwt.sign(payload, authConfig.secret);
        return returnSimpleResult(err, {token}, cb);
      }
      else {
        return returnSimpleError("Password does not match our records.", 400, cb);
      }

    });
  }

  getUserByToken(userToken, cb){
    const payload = jwt.decode(userToken);
    if (!payload){
      return returnSimpleError("Could not derive user from auth token.", 400, cb);
    }
    return this.getUserByUsername(payload, cb);
  }

  getUserByUsername(username, cb){
    this.user_collection.findOne({username: username.username}, ['_id', 'username'], (err, user) => {
      if (!user) return returnSimpleError("User " + username + " not found.", 400, cb);
      return returnSimpleResult(err, {user}, cb)
    });
  }

  getAll(cb){
    this.user_collection.find({}, ["_id", "username"], (err, docs) => {
      return returnSimpleResult(err, docs, cb);
    });
  }
}

export default new User();