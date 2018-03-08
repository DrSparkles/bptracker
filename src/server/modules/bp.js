import { db, returnSimpleResult, returnSimpleError, getId, getIdFromJSON } from '../lib/db';

class BP {

  constructor(){
    this.bp_collection = db.get('bp_records');
  }

  createNew(bpValues, cb){

    const validationErrors = [];
    if (bpValues.userId === undefined || bpValues.userId === ""){
      validationErrors.push("Must have a user id to create a new entry.");
    }

    if (bpValues.datetime === undefined || bpValues.datetime === ""){
      validationErrors.push("Must have a datetime value to create a new entry.");
    }

    if (bpValues.sys === undefined || bpValues.sys === ""){
      validationErrors.push("Must have a sys value to create a new entry.");
    }

    if (bpValues.dia === undefined || bpValues.dia === ""){
      validationErrors.push("Must have a dia value to create a new entry.");
    }

    if (bpValues.pulse === undefined || bpValues.pulse === ""){
      validationErrors.push("Must have a pulse value to create a new entry.");
    }

    if (validationErrors.length){
      return returnSimpleError(validationErrors, 400, cb);
    }

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

    if (userId === undefined || userId === ""){
      return returnSimpleError("Must have a user id to fetch their entries.", 400, cb);
    }

    const userObjectId = getId(userId);
    this.bp_collection.find({userId: userObjectId}, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  getByValue(searchTerms, cb){

    // make sure we're searching on the correct item type
    if (searchTerms._id !== 'undefined'){
      searchTerms._id = getIdFromJSON(searchTerms);
    }

    this.bp_collection.find(searchTerms, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  deleteEntry(_id, cb){

    if (_id === undefined || _id === ""){
      return returnSimpleError("Must have an id to delete an entry.", 400, cb);
    }

    // get our mongo id to replace the id as string
    const query = {_id: getIdFromJSON(_id)};
    this.bp_collection.remove(query, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  editEntry(_id, updateValues, cb){

    if (_id === undefined || _id === ""){
      return returnSimpleError("Must have an id to update an entry.", 400, cb);
    }

    const query = {_id: getIdFromJSON(_id)};
    updateValues.userId = getId(updateValues.userId);
    this.bp_collection.update(query, updateValues, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

}

export default new BP();