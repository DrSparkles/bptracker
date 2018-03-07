import axios from 'axios';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = '/api';

const handleErrors = err => {
  console.log("AGENT handleErrors err", err);
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

//const responseBody = res => res.body;
const responseBody = res => {
  console.log(res);
  return JSON.parse(res.text);
}
const responseBodyTesting = res => {
  console.log("DBAGENT TESTING res.text", JSON.parse(res.text));
  console.log("RES", res);
  return JSON.parse(res.text);
};

const tokenPlugin = req => {
  if (commonStore.token) {
    req.set('x-access-token', commonStore.token);
  }
};

const requests = {
  del: url => {
    return superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  },
  get: url => {
    let result = superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
    return result;
  },
  put: (url, body) => {
    return superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  },
  post: (url, body) => {
    return superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody);
  },
};

const Auth = {
  current: () => {
    return requests.get('/users/user')
  },
  login: (username, password) => {
    console.log("AGENT login username", username);
    console.log("AGENT login password", password);
    return requests.post('/users/authenticate', { username, password })
  },
  register: (username, password) => {
    return requests.post('/users', { user: { username, password } })
  },
  save: user => {
    return requests.put('/user', { user })
  }
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