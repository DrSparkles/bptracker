import { observable, action, reaction } from 'mobx';
import agent from '../agent';

class CommonStore {

  @observable appName = 'BP Tracker';
  @observable token = window.localStorage.getItem('jwt');
  @observable appLoaded = false;

  @observable tags = [];
  @observable isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new CommonStore();
