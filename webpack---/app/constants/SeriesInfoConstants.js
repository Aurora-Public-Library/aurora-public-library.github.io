import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('SERIES_INFO', {
  FETCH_SAME_SERIES_REQUEST: null,
  FETCH_SAME_SERIES_SUCCESS: null,
  FETCH_SAME_SERIES_FAILURE: null
});
