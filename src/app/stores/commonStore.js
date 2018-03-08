import { observable, action, reaction } from 'mobx';
import agent from '../agent';

class CommonStore {

  @observable appName = 'BP Tracker';
  @observable token = window.localStorage.getItem('jwt');
  @observable appLoaded = false;

  @observable datetimeFormat = 'YYYY-MM-DD HH:mm';

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        }
        else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
    console.log("COMMON STORE token in constructor", this.token);
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new CommonStore();
