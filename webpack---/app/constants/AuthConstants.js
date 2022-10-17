import { createReduxConstants } from '@bibliocommons/utils-redux';

export const REMEMBER_ME_COOKIE = 'remember_me';

export default createReduxConstants('AUTH', {
  AUTH_LOGIN_REQUEST: null,
  AUTH_LOGIN_SUCCESS: null,
  AUTH_LOGIN_ERROR: null,
  AUTH_LOGOUT: null,
  AUTH_LOAD_USER_REQUEST: null,
  AUTH_LOAD_USER_SUCCESS: null,
  AUTH_LOAD_USER_FAILURE: null,
  OPEN_LOGIN_DIALOG: null,
  CLOSE_LOGIN_DIALOG: null,
  REQUIRES_LIBRARY_ACCOUNT: null
});
