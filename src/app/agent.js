import axios from 'axios';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from '../stores/CommonStore';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = '/api';

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    //authStore.logout();
  }
  return err;
};

//const responseBody = res => res.body;
const responseBody = res => JSON.parse(res.text);
const responseBodyTesting = res => {
  console.log("DBAGENT TESTING res.text", JSON.parse(res.text));
  console.log(res);

};

const requests = {
  del: url => {
    return superagent
      .del(`${API_ROOT}${url}`)
      .end(handleErrors)
      .then(responseBody);
  },
  get: url => {
    let result = superagent
      .get(`${API_ROOT}${url}`)
      .end(handleErrors)
      .then(responseBody);
    return result;
  },
  put: (url, body) => {
    return superagent
      .put(`${API_ROOT}${url}`, body)
      .end(handleErrors)
      .then(responseBody);
  },
  post: (url, body) => {
    console.log("DBAgent body", body);
    return superagent
      .post(`${API_ROOT}${url}`, body)
      .end(handleErrors)
      .then(responseBody);
  },
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const BP = {
  get: () => {
    return requests.get('/bp');
  },
  createNew: (saveData) => {
    console.log("DBAgent saveData", saveData);
    return requests.post('/bp', saveData);
  },
  editEntry: (saveData) => {
    const url = '/bp/' + saveData._id;
    console.log("DBAgent edit data", saveData);
    return requests.put(url, saveData);
  },
  deleteEntry: (_id) => {
    const url = '/bp/' + _id;
    return requests.del(url);
  }
};

export default {
  Auth,
  BP
};