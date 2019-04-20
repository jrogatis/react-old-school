import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { loggedIn: true, user, loggingIn: false }
  : { loggedIn: false, user: { usernane: '', password: '' }, loggingIn: false };

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        loggingIn: false
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
