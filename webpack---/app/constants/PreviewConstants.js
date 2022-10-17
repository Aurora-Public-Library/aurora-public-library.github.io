import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('OPT_IN', {
  SUBMIT_OPT_IN_FEEDBACK_REQUEST: null,
  SUBMIT_OPT_IN_FEEDBACK_SUCCESS: null,
  SUBMIT_OPT_IN_FEEDBACK_FAILURE: null,
  OPT_IN_REQUEST: null,
  OPT_IN_SUCCESS: null,
  OPT_IN_FAILURE: null,
  OPT_OUT_REQUEST: null,
  OPT_OUT_SUCCESS: null,
  OPT_OUT_FAILURE: null
});

// Feedback Modal
export const FEELINGS = ['positive', 'mixed', 'negative'];
