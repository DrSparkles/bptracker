import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';

import Layout from "./components/pages/Layout/Layout";

import commonStore from './stores/commonStore';
import authStore from './stores/authStore';
import userStore from './stores/userStore';
import bpEditorStore from './stores/bpEditorStore';
import bpStore from './stores/bpStore';

const stores = {
  commonStore,
  authStore,
  userStore,
  bpEditorStore,
  bpStore
};

const app = document.getElementById("app-container");

/**
 * Provide the stores to all child components to be grabbed up using the inject decorator
 * Init the Router
 * Load the Layout which has the basic page elements and routes, which themselves load page components
 */
ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <Layout stores={stores} />
    </HashRouter>
  </Provider>,
  app
);