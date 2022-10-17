import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('RATINGS', {
  GET_ITEM_RATING_REQUEST: null,
  GET_ITEM_RATING_SUCCESS: null,
  GET_ITEM_RATING_FAILURE: null,
  RATE_ITEM_REQUEST: null,
  RATE_ITEM_SUCCESS: null,
  RATE_ITEM_FAILURE: null,
  CHANGE_ITEM_RATING_REQUEST: null,
  CHANGE_ITEM_RATING_SUCCESS: null,
  CHANGE_ITEM_RATING_FAILURE: null,
  REMOVE_ITEM_RATING_REQUEST: null,
  REMOVE_ITEM_RATING_SUCCESS: null,
  REMOVE_ITEM_RATING_FAILURE: null
});
