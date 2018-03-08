import { observable, action, computed } from 'mobx';
import agent from '../agent';
import userStore from './userStore';

class BPStore {

  @observable isLoading = false;
  @observable bpRegistry = observable.map(); // bpId -> bpEntry

  @computed get bpList(){
    return this.bpRegistry.values();
  };

  getBP(bpId) {
    return this.bpRegistry.get(bpId);
  }

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

  @action loadAllBPs() {
    this.isLoading = true;
    return agent.BP
      .getAll()
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

  @action deleteBP(bpId) {
    this.bpRegistry
      .delete(bpId);

    return agent.BP
      .deleteEntry(bpId)
      .catch(action(err => { this.loadAllBPs(); throw err; }));
  }

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