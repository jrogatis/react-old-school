import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

const login = (username, password) => async dispatch => {
  // return the promise using fetch which adds to localstorage on resolve
  const request = user => ({ type: userConstants.LOGIN_REQUEST, user });
  const success = user => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = error => ({ type: userConstants.LOGIN_FAILURE, error });
  const user = {
    username,
    password
  };
  dispatch(request(user));
  try {
    await userService.login(username, password);
    await dispatch(success(user));
    await dispatch(alertActions.clear());
    history.push('/');
  } catch (err) {
    await dispatch(alertActions.error('Username or password is incorrect'));
    return dispatch(failure(err));
  }
};

function logout() {
  userService.logout();
  return {
    type: userConstants.LOGOUT
  };
}

const register = user => async dispatch => {
  const request = user => ({ type: userConstants.REGISTER_REQUEST, user });
  const success = user => ({ type: userConstants.REGISTER_SUCCESS, user });
  const failure = error => ({ type: userConstants.REGISTER_FAILURE, error });
  dispatch(request(user));
  try {
    await userService.register(user);
    await dispatch(alertActions.success('Registration successful'));
    await dispatch(success(user));
    return history.push('/');
  } catch (err) {
    await dispatch(alertActions.error(err));
    return dispatch(failure(err));
  }
};

export const userActions = {
  login,
  logout,
  register
};
