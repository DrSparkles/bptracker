import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { inject, observer } from 'mobx-react';

/**
 * Load styles, both for the top level app as a whole and for this specific page
 */
import mainStyles from '../../../styles/masterStyle.css';
import layoutStyles from './styles.css';

import Header from '../../Header';
import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import BPEditor from '../BPEditor';
import PrivateRoute from "../../PrivateRoute";

@inject('commonStore', 'userStore')
@withRouter
@observer
export default class Layout extends React.Component {

  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore
        .pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render(){
    if (this.props.commonStore.appLoaded) {
      return (

        <div id='Layout' className="container">
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/editor/:_id?" component={BPEditor} />
            <Route path="/" component={Home} />
          </Switch>

        </div>
      );
    }
    else {
      return (
        <div id='Layout' className="container">
          <Header />
        </div>
      );
    }
  }
}