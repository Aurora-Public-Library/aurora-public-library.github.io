import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('LIKES', {
  ADD_LIKE_REQUEST: null,
  ADD_LIKE_SUCCESS: null,
  ADD_LIKE_FAILURE: null,
  REMOVE_LIKE_REQUEST: null,
  REMOVE_LIKE_SUCCESS: null,
  REMOVE_LIKE_FAILURE: null,
  GET_LIKES_REQUEST: null,
  GET_LIKES_SUCCESS: null,
  GET_LIKES_FAILURE: null
});
