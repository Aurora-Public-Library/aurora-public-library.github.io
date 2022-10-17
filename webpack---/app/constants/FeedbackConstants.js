import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('FEEDBACK', {
  EXPAND_FEEDBACK: null,
  COLLAPSE_FEEDBACK: null,
  UPDATE_CATEGORY: null,

  SUBMIT_FEEDBACK_REQUEST: null,
  SUBMIT_FEEDBACK_SUCCESS: null,
  SUBMIT_FEEDBACK_FAILURE: null
});
