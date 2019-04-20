import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: ''
      },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // handle input change and dispatch register
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    const { register } = this.props;

    this.setState({ submitted: true }, async () => {
      if (user.username && user.password) {
        await register(user);
      }
    });
  }

  render() {
    const { user, submitted } = this.state;
    const { registering } = this.props;
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Register</h2>
          <form name='form' onSubmit={this.handleSubmit}>
            <div
              className={
              'form-group' + (submitted && !user.username ? ' has-error' : '')
            }
          >
            <label htmlFor='username'>Username</label>
              <input
                type='text'
                className='form-control username'
                name='username'
                onChange={this.handleChange}
            />
              {submitted && !user.username && (
              <div className='help-block'>Username is required</div>
            )}
            </div>
              <div
                className={
              'form-group' + (submitted && !user.password ? ' has-error' : '')
            }
          >
            <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control password'
                name='password'
                onChange={this.handleChange}
            />
                {submitted && !user.password && (
                <div className='help-block'>Password is required</div>
            )}
              </div>
                <div className='form-group'>
                  <button disabled={registering} className='btn btn-primary'>
              Register
            </button>
              <Link
                to={{ pathname: '/login', state: { clearAlert: true } }}
                className='btn btn-link'
            >
              Cancel
            </Link>
                </div>
          </form>
      </div>
    );
  }
}

const mapStateToProps = ({
  authentication,
  registration: { registering }
}) => ({
  registering,
  authentication
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(userActions.register(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);

export { RegisterPage as TestRegisterPage };
