import { observable, action } from 'mobx';
import agent from '../agent';

class UserStore {

  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;

  @action pullUser() {
    this.loadingUser = true;
    return agent.Auth
      .current()
      .then(action((user) => {
        return this.currentUser = user.result.user;
      }))
      .finally(action(() => { this.loadingUser = false; }))
  }

  @action forgetUser() {
    this.currentUser = undefined;
  }


  /*

    UPCOMING FEATURE

    @action updateUser(newUser) {
      this.updatingUser = true;
      return agent.Auth.save(newUser)
        .then(action((user) => { this.currentUser = user.result; }))
        .finally(action(() => { this.updatingUser = false; }))
    }
  */
}

export default new UserStore();
