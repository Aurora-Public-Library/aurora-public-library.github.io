import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('GROUP_SEARCH_FEEDBACK', {
  OPEN_FEEDBACK_OVERLAY: null,
  CLOSE_FEEDBACK_OVERLAY: null,

  CHOOSE_SHOULD_MATCH: null,

  SELECT_MATCHING_BIB: null,
  CHANGE_MATCHING_BIB: null,

  SUBMIT_FEEDBACK_REQUEST: null,
  SUBMIT_FEEDBACK_SUCCESS: null,
  SUBMIT_FEEDBACK_FAILURE: null
});
