import { observable, action } from 'mobx';
import moment from 'moment';
import bpStore from './bpStore';
import userStore from './userStore';
import commonStore from './commonStore';

class BPEditorStore {

  @observable inProgress = false;
  @observable errors = undefined;
  @observable bpId = undefined;

  @observable userId = userStore.currentUser._id;
  @observable datetime = '';
  @observable sys = '';
  @observable dia = '';
  @observable pulse = '';
  @observable notes = '';

  @action submit() {
    this.inProgress = true;
    this.errors = undefined;

    console.log(this.datetime);
    let datetime = this.datetime;

    const bp = {
      userId: this.userId,
      datetime: datetime,
      sys: this.sys,
      dia: this.dia,
      pulse: this.pulse,
      notes: this.notes
    };

    if (this.bpId){
      bp._id = this.bpId;
    }
    console.log("BPEDITOR STORE submit bp", bp);
    return (this.bpId ? bpStore.updateBP(bp) : bpStore.createBP(bp))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors; throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

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

  @action reset() {
    this.bpId = undefined;
    this.datetime = '';
    this.sys = '';
    this.dia = '';
    this.pulse = '';
    this.notes = '';
  }

  @action setBpId(bpId) {
    if (this.bpId !== bpId) {
      this.reset();
      this.bpId = bpId;
    }
  }

  @action setDatetime(datetime){
    this.datetime = datetime;
  }

  @action setSys(sys){
    this.sys = sys;
  }

  @action setDia(dia){
    this.dia = dia;
  }

  @action setPulse(pulse){
    this.pulse = pulse;
  }

  @action setNotes(notes){
    this.notes = notes;
  }
}

export default new BPEditorStore();