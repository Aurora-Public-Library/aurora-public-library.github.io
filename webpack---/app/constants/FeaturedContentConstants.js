import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('FEATURED_CONTENT', {
  FEATURED_CONTENT_REQUEST: null,
  FEATURED_CONTENT_SUCCESS: null,
  FEATURED_CONTENT_FAILURE: null
});
