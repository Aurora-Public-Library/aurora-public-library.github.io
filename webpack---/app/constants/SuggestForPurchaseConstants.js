import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('SUGGEST_FOR_PURCHASE', {
  SUBMIT_LITE_SUGGESTION_REQUEST: null,
  SUBMIT_LITE_SUGGESTION_SUCCESS: null,
  SUBMIT_LITE_SUGGESTION_FAILURE: null
});
