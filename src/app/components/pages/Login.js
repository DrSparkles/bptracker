import { withRouter, Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('authStore')
@withRouter
@observer
export default class Login extends React.Component {

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore
      .login()
      .then(() => this.props.history.replace('/'));
  };

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <div id="Login">
        <h1>Sign In</h1>
        <p>
          <Link to="register">
            Need an account?
          </Link>
        </p>

        <ListErrors errors={errors} />

        <form onSubmit={this.handleSubmitForm}>
          <fieldset>

            <fieldset>
              <input
                type="username"
                placeholder="User Name"
                value={values.username}
                onChange={this.handleUsernameChange}
              />
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={this.handlePasswordChange}
              />
            </fieldset>

            <button
              type="submit"
              disabled={inProgress}
            >
              Sign in
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}
