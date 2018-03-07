import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';


import Layout from "./components/pages/Layout/Layout";

import commonStore from './stores/CommonStore';
// import bpStore from './stores/BPStore';

const stores = {
  commonStore,
  // bpStore
};

const app = document.getElementById("app-container");

/**
 * Provide the stores to all child components to be grabbed up using the inject decorator
 * Init the Router
 * Load the Layout which has the basic page elements and routes, which themselves load page components
 */
ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <Layout stores={stores} />
    </Router>
  </Provider>,
  app
);