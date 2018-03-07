import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';

import styles from './styles.css';

@inject('userStore', 'commonStore', 'authStore')
@observer
export default class MainNav extends React.Component {

  constructor(props){
    super(props);
  }

  handleClickLogout = () =>
    this.props.authStore
      .logout()
      .then(() => this.props.history.replace('/'));

  render(){
    console.log("this.props.userStore.currentUser", this.props.userStore.currentUser);
    return (
      <div className={styles.navLinks}>
        <LoggedOutView currentUser={this.props.userStore.currentUser} />

        <LoggedInView currentUser={this.props.userStore.currentUser} onLogout={this.handleClickLogout} />
      </div>
    );
  }
}

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul>

        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li>
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li>
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul>

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/editor">
            New Entry
          </Link>
        </li>

        <li>
          <Link to="/settings">
            Settings
          </Link>
        </li>


        <li>
          <a href='#' onClick={props.onLogout}>Log Out</a>
        </li>
      </ul>
    );
  }

  return null;
};