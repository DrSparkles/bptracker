import { observable, action } from 'mobx';
import agent from '../agent';
import userStore from './userStore';
import commonStore from './commonStore';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    username: '',
    password: '',
  };

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    console.log("AUTH STORE LOGIN username", this.values.username);
    console.log("AUTH STORE LOGIN password", this.values.password);
    return agent.Auth
      .login(this.values.username, this.values.password)
      .then ((userToken) => {
        console.log("TOKEN", userToken);
        commonStore.setToken(userToken.result.token);
      })
      .then(() => {
        userStore.pullUser()
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(this.values.username, this.values.password)
      .then(({ user }) => commonStore.setToken(user.token))
      .then(() => userStore.pullUser())
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();
    return Promise.resolve();
  }
}

export default new AuthStore();
