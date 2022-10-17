import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('SAVED_SEARCH', {
  SAVE_REQUEST: null,
  SAVE_SUCCESS: null,
  SAVE_FAILURE: null,
  CHOOSE_NEW_NAME: null,
  REPLACE_SAVE_SEARCH_REQUEST: null,
  REPLACE_SAVE_SEARCH_SUCCESS: null,
  REPLACE_SAVE_SEARCH_FAILURE: null
});
