import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // reset login status
    this.state = {
      username: '',
      password: '',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { username, password } = this.state;
    this.setState({ submitted: true }, async () => {
      if (username && password) {
        await login(username, password);
      }
    });
  }

  render() {
    const { username, password, submitted } = this.state;
    const { loggingIn } = this.props;
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Login</h2>
          <form name='form' onSubmit={this.handleSubmit}>
            <div
              className={
              'form-group' + (submitted && !username ? ' has-error' : '')
            }
          >
            <label htmlFor='username'>Username</label>
              <input
                type='text'
                className='form-control username'
                name='username'
                onChange={this.handleChange}
            />
              {submitted && !username && (
              <div className='help-block'>Username is required</div>
            )}
            </div>
              <div
                className={
              'form-group' + (submitted && !password ? ' has-error' : '')
            }
          >
            <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control password'
                name='password'
                onChange={this.handleChange}
            />
                {submitted && !password && (
                <div className='help-block'>Password is required</div>
            )}
              </div>
                <div className='form-group'>
                  <button
                    disabled={loggingIn}
                    className='btn btn-primary'
                    type='submit'
            >
              Login
            </button>
              <Link disabled={loggingIn} className='btn btn-link' to='/register'>
              Register
            </Link>
                </div>
          </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { loggingIn } }) => ({
  loggingIn
});
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(userActions.login(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export { LoginPage as TestLoginPage };
