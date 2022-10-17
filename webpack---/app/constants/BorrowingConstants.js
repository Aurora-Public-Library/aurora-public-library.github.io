import { createReduxConstants } from '@bibliocommons/utils-redux';

export const BORROWING_VIEW_COOKIE_NAME = 'borrowingViewOption';

export default createReduxConstants('BORROWING', {
  FETCH_SUMMARIES_REQUEST: null,
  FETCH_SUMMARIES_SUCCESS: null,
  FETCH_SUMMARIES_FAILURE: null,
  TOGGLE_BORROWING_VIEW: null
});
