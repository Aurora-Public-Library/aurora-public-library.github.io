import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('LIBRARY', {
  LIBRARY_REQUEST: null,
  LIBRARY_SUCCESS: null,
  LIBRARY_FAILURE: null
});
