import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { inject, observer } from 'mobx-react';

// import mainStyles from '../../../public/styles/styles.css';
import layoutStyles from './styles.css';

import Header from '../../Header';
import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import BPEditor from '../BPEditor';

import mainStyles from '../../../styles/masterStyle.css';

@inject('commonStore', 'userStore')
@withRouter
@observer
export default class Layout extends React.Component {

  componentWillMount() {
    console.log("LAYOUT token willMount", this.props.commonStore.token);
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    console.log("LAYOUT token didMount", this.props.commonStore.token);
    if (this.props.commonStore.token) {
      this.props.userStore
        .pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render(){
    console.log("LAYOUT render appLoaded", this.props.commonStore.appLoaded);
    if (this.props.commonStore.appLoaded) {
      return (

        <div id='Layout' className={layoutStyles.pageContainer}>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:_id?" component={BPEditor} />
            <Route path="/" component={Home} />
          </Switch>

        </div>
      );
    }
    else {
      return (
        <div id='Layout' className={layoutStyles.pageContainer}>
          <Header />
        </div>
      );
    }
  }
}