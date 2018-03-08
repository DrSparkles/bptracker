import { observable, action, computed } from 'mobx';
import agent from '../agent';
import userStore from './userStore';
import moment from "moment/moment";
import commonStore from "./commonStore";

class BPStore {

  @observable isLoading = false;
  @observable bpRegistry = observable.map(); // bpId -> bpEntry

  @computed get bpList(){
    console.log("BPSTORE bpList", this.bpRegistry.values());
    return this.bpRegistry.values();
  };

  getBP(bpId) {
    return this.bpRegistry.get(bpId);
  }

  @action loadAllBPsForUser() {
    console.log("bpStore loadAllBPsForUser current user", userStore.currentUser);
    this.isLoading = true;
    return agent.BP
      .getAllForUser(userStore.currentUser._id)
      .then(action((bpItems) => {
        this.bpRegistry.clear();
        const bpItemData = bpItems.result;
        bpItemData.forEach(bp => this.bpRegistry.set(bp._id, bp));
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
      .finally(action(() => { this.isLoading = false; }));
  }

  @action createBP(data) {
    return agent.BP
      .createNew(data)
      .then((bp) => {
        const bpData = bp.result;
        console.log("bpStore createBP", bp);
        this.bpRegistry.set(bpData._id, bpData);
        return bpData;
      })
  }

  @action updateBP(data) {
    return agent.BP
      .editEntry(data)
      .then((bp) => {
        console.log("BPSTORE updateBP bp", bp);
        this.bpRegistry.set(data._id, data);
        return bp;
      })
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

  getDatetimeAsFormattedString(datetime){
    if (datetime){
      return moment.unix(datetime).format(commonStore.datetimeFormat);
    }
    return '';
  }
}

export default new BPStore();