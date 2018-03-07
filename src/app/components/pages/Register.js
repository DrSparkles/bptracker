import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('authStore')
@observer
export default class Register extends React.Component {

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore
      .register()
      .then(() => this.props.history.replace('/'));
  };

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <div id="Register">
        <div>
          <h1>Sign Up</h1>
          <p>
            <Link to="login">
              Have an account?
            </Link>
          </p>
        </div>

        <ListErrors errors={errors} />

        <form onSubmit={this.handleSubmitForm}>
          <fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Username"
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
