import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('MESSAGES', {
  FETCH_MESSAGES_REQUEST: null,
  FETCH_MESSAGES_SUCCESS: null,
  FETCH_MESSAGES_FAILURE: null
});
