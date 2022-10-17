import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('ANALYTICS', {
  FETCH_DATALAYER_REQUEST: null,
  FETCH_DATALAYER_SUCCESS: null,
  FETCH_DATALAYER_FAILURE: null,
  SET_CONTEXT: null
});
