import { db, returnSimpleResult, getIdFromJSON } from '../lib/db';
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
    if (username == undefined || username == "" || password == undefined || password == ""){
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
      return returnSimpleResult("Username and password must not be blank.", {}, cb);
    }

    this.user_collection.findOne({username}, (err, userDoc) => {
      if (err) return returnSimpleResult(err, doc, cb);

      if (!userDoc){
        return returnSimpleResult("User " + username + " not found.", {}, cb);
      }

      if(bcrypt.compareSync(password, userDoc.password)) {

        const payload = {
          username
        };
        console.log("AUTH SECRET", authConfig.secret);
        const token = jwt.sign(payload, authConfig.secret);

        return returnSimpleResult(err, {token}, cb);
      }
      else {
        return returnSimpleResult("Password does not match our records.", {}, cb);
      }

    });
  }

  getAll(cb){
    this.user_collection.find({}, ["_id", "username"], (err, docs) => {
      return returnSimpleResult(err, docs, cb);
    });
  }

  searchByUsername(username, cb){
    this.user_collection.find({username}, (err, userDoc) => {
      const doc = {_id: userDoc._id, username: userDoc.username};
      return returnSimpleResult(err, doc, cb);
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

export default new User();