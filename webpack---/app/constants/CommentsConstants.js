import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('COMMENTS', {
  GET_COMMENT_REQUEST: null,
  GET_COMMENT_SUCCESS: null,
  GET_COMMENT_FAILURE: null,
  GET_COMMENTS_REQUEST: null,
  GET_COMMENTS_SUCCESS: null,
  GET_COMMENTS_FAILURE: null,
  ADD_COMMENT_REQUEST: null,
  ADD_COMMENT_SUCCESS: null,
  ADD_COMMENT_FAILURE: null,
  UPDATE_COMMENT_REQUEST: null,
  UPDATE_COMMENT_SUCCESS: null,
  UPDATE_COMMENT_FAILURE: null,
  REMOVE_COMMENT_REQUEST: null,
  REMOVE_COMMENT_SUCCESS: null,
  REMOVE_COMMENT_FAILURE: null
});
