import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('CONTENT_WARNINGS', {
  SHOW_CONTENT: null,
  HIDE_CONTENT: null,
  SHOW_OFFENSIVE_CONTENT_REQUEST: null,
  SHOW_OFFENSIVE_CONTENT_SUCCESS: null,
  SHOW_OFFENSIVE_CONTENT_FAILURE: null,
  HIDE_OFFENSIVE_CONTENT_REQUEST: null,
  HIDE_OFFENSIVE_CONTENT_SUCCESS: null,
  HIDE_OFFENSIVE_CONTENT_FAILURE: null,
  SHOW_SPOILERS_REQUEST: null,
  SHOW_SPOILERS_SUCCESS: null,
  SHOW_SPOILERS_FAILURE: null,
  HIDE_SPOILERS_REQUEST: null,
  HIDE_SPOILERS_SUCCESS: null,
  HIDE_SPOILERS_FAILURE: null
});

export const OFFENSIVE_CONTENT_COOKIE_NAME = 'ugc_offensive_visible';
export const SPOILERS_COOKIE_NAME = 'ugc_spoiler_visible';
