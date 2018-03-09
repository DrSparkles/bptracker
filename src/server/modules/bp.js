import { db, returnSimpleResult, returnSimpleError, getId, getIdFromJSON } from '../lib/db';

/**
 * BP Data
 */
class BP {

  constructor(){
    this.bp_collection = db.get('bp_records');
  }

  /**
   * Create a new entry
   * The bpValues parameter should look as follows - all are required except for "notes":
   * {
   *    userId: the user id belonging,
   *    datetime: STRING the date of the entry,
   *    sys: INT,
   *    dia: INT,
   *    pulse: INT
   *    notes: STRING
   * }
   * @param {object} bpValues
   * @param cb
   * @returns {*}
   */
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

    // error on out validation problems
    if (validationErrors.length){
      return returnSimpleError(validationErrors, 400, cb);
    }

    // else create the entry
    bpValues.userId = getId(bpValues.userId);
    this.bp_collection.insert(bpValues, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });

  }

  /**
   * Fetch all bp values; this is for debugging
   * @param cb
   */
  getAll(cb){
    this.bp_collection.find({}, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  /**
   * Fetch all BP Values for a given user
   * @param userId
   * @param cb
   * @returns {*}
   */
  getAllForUser(userId, cb){

    // if no userId error out
    if (userId === undefined || userId === ""){
      return returnSimpleError("Must have a user id to fetch their entries.", 400, cb);
    }

    // else return our data
    const userObjectId = getId(userId);
    this.bp_collection.find({userId: userObjectId}, {sort: {datetime: -1}}, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  /**
   * Search values
   * @param searchTerms
   * @param cb
   */
  getByValue(searchTerms, cb){

    // make sure we're searching on the correct item type
    if (searchTerms._id !== 'undefined'){
      searchTerms._id = getIdFromJSON(searchTerms);
    }

    this.bp_collection.find(searchTerms, {}, (err, doc) => {
      return returnSimpleResult(err, doc, cb);
    });
  }

  /**
   * Given a bp id, delete an entry
   * @param _id
   * @param cb
   * @returns {*}
   */
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

  /**
   * Edit an entry; the entire object will be passed in with any updated data
   * {
   *    _id: the BP id
   *    userId: the user id belonging,
   *    datetime: STRING the date of the entry,
   *    sys: INT,
   *    dia: INT,
   *    pulse: INT
   *    notes: STRING
   * }
   *
   * @param _id
   * @param updateValues
   * @param cb
   * @returns {*}
   */
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