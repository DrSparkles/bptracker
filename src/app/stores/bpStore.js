import { observable, action, computed } from 'mobx';
import agent from '../agent';
import userStore from './userStore';

/**
 * App state for Blood Pressure entries
 */
class BPStore {

  /**
   * Is a blood pressure entry being loaded?
   * @type {boolean}
   */
  @observable isLoading = false;

  /**
   * A list of a user's blood pressure entries mapped as bpId -> bpEntry
   * @type {ObservableMap<any>}
   */
  @observable bpRegistry = observable.map(); // bpId -> bpEntry

  /**
   * Load the bp values from the registry
   * @returns {*|(V[] & Iterator<V>)}
   */
  @computed get bpList(){
    return this.bpRegistry.values();
  };

  /**
   * Given a bpId, return a specific bp entry
   * @param bpId
   * @returns {*|V}
   */
  getBP(bpId) {
    return this.bpRegistry.get(bpId);
  }

  /**
   * Given the current user's id (as fetched through the currentUser object),
   * get the bp values from the database
   * @returns {Promise<any>}
   */
  @action loadAllBPsForUser() {
    this.isLoading = true;
    return agent.BP
      .getAllForUser(userStore.currentUser._id)
      .then(action((bpItems) => {
        this.bpRegistry.clear();
        const bpItemData = bpItems.result;
        bpItemData.forEach(bp => this.bpRegistry.set(bp._id, bp));
      }))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.message;
        throw err;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  /**
   * Create a new bp entry.  Expecting an object as such:
   * {
   *   userId: INT current users db id
   *   datetime: STRING currently a string representation of the date
   *   sys: INT
   *   dia: INT
   *   pulse: INT
   *   notes: STRING optional
   * }
   * @param {object} data
   * @returns {Promise<T>}
   */
  @action createBP(data) {
    return agent.BP
      .createNew(data)
      .then((bp) => {
        const bpData = bp.result;
        this.bpRegistry.set(bpData._id, bpData);
        return bpData;
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.message;
        throw err;
      }));
  }

  /**
   * Update an entry.  The entire object wil be passed through with values, not just the
   * edited ones
   * {
   *   userId: INT current users db id
   *   datetime: STRING currently a string representation of the date
   *   sys: INT
   *   dia: INT
   *   pulse: INT
   *   notes: STRING optional
   * }
   * @param {object} data
   * @returns {Promise<T>}
   */
  @action updateBP(data) {
    return agent.BP
      .editEntry(data)
      .then((bp) => {
        this.bpRegistry.set(data._id, data);
        return bp;
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.message;
        throw err;
      }));
  }

  /**
   * Delete an entry given the bpId.  The entry will be removed from the local registry as well
   * as from the database.
   * @param {number} bpId
   * @returns {*|Promise<T>}
   */
  @action deleteBP(bpId) {
    this.bpRegistry
      .delete(bpId);

    return agent.BP
      .deleteEntry(bpId)
      .catch(action(err => { this.loadAllBPs(); throw err; }));
  }

  /**
   * Load a specific BP value given the id
   * @param {number} bpId
   * @param {boolean} acceptCached
   * @returns {Promise<any>}
   */
  @action loadBP(bpId, { acceptCached = false } = {}) {
    if (acceptCached) {
      const bp = this.getBP(bpId);
      if (bp) return Promise.resolve(bp);
    }

    this.isLoading = true;
    return agent.BP
      .getEntry(bpId)
      .then(action(( bp ) => {
        this.bpRegistry.set(bp.result[0]._id, bp.result[0]);
        return bp.result[0];
      }))
      .finally(action(() => { this.isLoading = false; }));
  }
}

export default new BPStore();