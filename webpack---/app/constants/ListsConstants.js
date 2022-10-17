import keyMirror from 'keymirror';
import { createReduxConstants } from '@bibliocommons/utils-redux';

export const LIST_CATEGORIES = keyMirror({
  STAFF: null,
  COMMUNITY: null,
  DRAFT: null,
  DRAFT_NOT_PUBLISHED: null,
  PUBLISHED: null,
  PUBLISHED_NO_DRAFT: null
});

export default createReduxConstants('LISTS', {
  GET_LISTS_REQUEST: null,
  GET_LISTS_SUCCESS: null,
  GET_LISTS_FAILURE: null,
  GET_CURRENT_USER_LISTS_REQUEST: null,
  GET_CURRENT_USER_LISTS_SUCCESS: null,
  GET_CURRENT_USER_LISTS_FAILURE: null,
  CREATE_LIST_ITEM_REQUEST: null,
  CREATE_LIST_ITEM_SUCCESS: null,
  CREATE_LIST_ITEM_FAILURE: null
});
