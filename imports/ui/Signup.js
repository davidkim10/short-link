import React from 'react';
import AuthLayout from './Layouts/AuthLayout';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    const firstName = this.refs.firstName.value.trim();
    const lastName = this.refs.lastName.value.trim();

    if (password.length < 8) {
      return this.setState({
        error: 'Password must be at least 8 characters long',
      });
    }

    Accounts.createUser(
      {
        email,
        password,
        profile: {
          firstName,
          lastName,
        },
      },
      (err) => {
        if (err) {
          this.setState({
            error: err.reason,
          });
        } else {
          this.setState({ error: '' });
        }
      }
    );
  }
  render() {
    return (
      <AuthLayout
        errorMessage={this.state.error}
        title="REGISTER"
        subTitle="Create an account with your email"
      >
        <form
          action=""
          onSubmit={this.onSubmit.bind(this)}
          noValidate
          className="login-form ui form"
        >
          <div className="field">
            <input
              type="text"
              name="firstName"
              ref="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="lastName"
              ref="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="field">
            <input
              type="email"
              name="email"
              ref="email"
              placeholder="Email Address"
            />
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              ref="password"
              placeholder="Password"
            />
          </div>

          <div className="field">
            <button className="ui button fluid large blue">
              Create Account
            </button>
          </div>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </AuthLayout>
    );
  }
}
