import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('RETURN_HISTORY', {
  FETCH_RETURN_HISTORY_REQUEST: null,
  FETCH_RETURN_HISTORY_SUCCESS: null,
  FETCH_RETURN_HISTORY_FAILURE: null
});
