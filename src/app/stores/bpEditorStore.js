import { observable, action } from 'mobx';
import bpStore from './bpStore';
import userStore from './userStore';

/**
 * App state to handle the form for adding and editing bp values
 */
class BPEditorStore {

  /**
   * Progress value for saving values; false if no db transaction is happening,
   * true if it's in progress
   * @type {boolean}
   */
  @observable inProgress = false;

  /**
   * Container for any errors returned from the save process, used for
   * displaying on the front end
   * @type {undefined | string | Array}
   */
  @observable errors = undefined;

  /**
   * bpId of a given loaded value for editing
   * Depending on the storage used, this will either be an integer or a string
   * @type {string | number}
   */
  @observable bpId = undefined;

  /**
   * The user id for the value being loaded
   * Depending on the storage used, this will either be an integer or a string
   * @type {string | number}
   */
  @observable userId = userStore.currentUser._id;

  /**
   * Form field value for the datetime
   * @type {string}
   */
  @observable datetime = '';

  /**
   * Form field value for sys
   * @type {string}
   */
  @observable sys = '';

  /**
   * Form field value for dia
   * @type {string}
   */
  @observable dia = '';

  /**
   * Form field value for the pulse
   * @type {string}
   */
  @observable pulse = '';

  /**
   * Form field value for any notes
   * @type {string}
   */
  @observable notes = '';

  /**
   * Create or edit a BP entry
   * @returns {Promise<any>}
   */
  @action submit() {
    this.inProgress = true;
    this.errors = undefined;

    let datetime = this.datetime;

    // create an object from our form values to be sent to the server
    const bp = {
      userId: this.userId,
      datetime: datetime,
      sys: this.sys,
      dia: this.dia,
      pulse: this.pulse,
      notes: this.notes
    };

    // if we're editing an existing one, there will be an id to go with it
    if (this.bpId){
      bp._id = this.bpId;
    }

    // either create or edit, hinging on the bpId
    return (this.bpId ? bpStore.updateBP(bp) : bpStore.createBP(bp))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors; throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  /**
   * Load a BP value or exit out if one can't be found.  Thus if someone reloads the edit form
   * with a no longer existing bp value, the form will fail gracefully
   * @returns {*}
   */
  @action loadInitialData() {
    if (!this.bpId) return Promise.resolve();
    this.inProgress = true;
    return bpStore.loadBP(this.bpId, { acceptCached: true })
      .then(action((bp) => {
        if (!bp) throw new Error('Can\'t load original article');
        this.userId = bp.userId;
        this.datetime = bp.datetime;
        this.sys = bp.sys;
        this.dia = bp.dia;
        this.pulse = bp.pulse;
        this.notes = bp.notes;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  /**
   * Clear our values
   */
  @action reset() {
    this.bpId = undefined;
    this.datetime = '';
    this.sys = '';
    this.dia = '';
    this.pulse = '';
    this.notes = '';
  }

  /**
   * Setter for the bpId
   * @param {string | number} bpId
   */
  @action setBpId(bpId) {
    if (this.bpId !== bpId) {
      this.reset();
      this.bpId = bpId;
    }
  }

  /**
   * Setter for the datetime
   * @param {string} datetime
   */
  @action setDatetime(datetime){
    this.datetime = datetime;
  }

  /**
   * Set sys
   * @param {number} sys
   */
  @action setSys(sys){
    this.sys = sys;
  }

  /**
   * Set dia
   * @param {number} dia
   */
  @action setDia(dia){
    this.dia = dia;
  }

  /**
   * Set pulse
   * @param {number} pulse
   */
  @action setPulse(pulse){
    this.pulse = pulse;
  }

  /**
   * Set notes
   * @param {string} notes
   */
  @action setNotes(notes){
    this.notes = notes;
  }
}

export default new BPEditorStore();