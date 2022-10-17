import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('VIDEOS', {
  GET_VIDEO_REQUEST: null,
  GET_VIDEO_SUCCESS: null,
  GET_VIDEO_FAILURE: null,
  GET_VIDEOS_REQUEST: null,
  GET_VIDEOS_SUCCESS: null,
  GET_VIDEOS_FAILURE: null,
  ADD_VIDEO_REQUEST: null,
  ADD_VIDEO_SUCCESS: null,
  ADD_VIDEO_FAILURE: null,
  UPDATE_VIDEO_REQUEST: null,
  UPDATE_VIDEO_SUCCESS: null,
  UPDATE_VIDEO_FAILURE: null,
  REMOVE_VIDEO_REQUEST: null,
  REMOVE_VIDEO_SUCCESS: null,
  REMOVE_VIDEO_FAILURE: null
});
