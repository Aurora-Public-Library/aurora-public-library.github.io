import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('CARDS', {
  SEARCH_CARDS_REQUEST: null,
  SEARCH_CARDS_SUCCESS: null,
  SEARCH_CARDS_FAILURE: null
});
