import React from 'react';
import AuthLayout from './Layouts/AuthLayout';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      hideErrorWrapper: false,
    };
    console.log(this.state);
  }

  handleErrorDismiss = () => {
    this.setState({
      hideErrorWrapper: true,
    });
  };
  onSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({
          error: 'Unable to login. Check email and password.',
        });
      } else {
        this.setState({
          error: '',
        });
      }
    });
  }

  render() {
    return (
      <div>
        <AuthLayout
          errorMessage={this.state.error}
          title="LOGIN"
          subTitle="Please login below with your email"
        >
          <form
            action=""
            onSubmit={this.onSubmit.bind(this)}
            className="login-form ui form"
          >
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
              <button className="ui button fluid large blue">LOGIN</button>
            </div>
          </form>

          <Link to="/signup">Need an Account? Register</Link>
        </AuthLayout>
      </div>
    );
  }
}
