import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('USER', {
  FETCH_USER_REQUEST: null,
  FETCH_USER_SUCCESS: null,
  FETCH_USER_ERROR: null
});
