import { db, returnSimpleResult, getId, getIdFromJSON } from '../lib/db';
import { ObjectID } from 'mongodb';

class BP {

  constructor(){
    this.bp_collection = db.get('bp_records');
  }

  createNew(bpValues, cb){
    console.log("MODULES createNew body", bpValues);
    bpValues.userId = getId(bpValues.userId);
    this.bp_collection.insert(bpValues, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });

  }

  getAll(cb){
    this.bp_collection.find({}, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  getAllForUser(userId, cb){
    const userObjectId = getId(userId);
    this.bp_collection.find({userId: userObjectId}, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  getByValue(searchTerms, cb){

    // make sure we're searching on the correct item type
    if (searchTerms._id != 'undefined'){
      searchTerms._id = getIdFromJSON(searchTerms);
    }

    this.bp_collection.find(searchTerms, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  deleteEntry(_id, cb){
    // get our mongo id to replace the id as string
    const query = {_id: getIdFromJSON(_id)};
    this.bp_collection.remove(query, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  editEntry(_id, updateValues, cb){
    const query = {_id: getIdFromJSON(_id)};
    updateValues.userId = getId(updateValues.userId);
    this.bp_collection.update(query, updateValues, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

}

export default new BP();