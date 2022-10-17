import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('SIMILAR_TITLES', {
  ADD_SIMILAR_TITLES_REQUEST: null,
  ADD_SIMILAR_TITLES_SUCCESS: null,
  ADD_SIMILAR_TITLES_FAILURE: null,
  REMOVE_SIMILAR_TITLES_REQUEST: null,
  REMOVE_SIMILAR_TITLES_SUCCESS: null,
  REMOVE_SIMILAR_TITLES_FAILURE: null
});
