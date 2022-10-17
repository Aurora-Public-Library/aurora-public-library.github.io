import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('RECOMMENDATIONS', {
  RECOMMENDATION_REQUEST: null,
  RECOMMENDATION_SUCCESS: null,
  RECOMMENDATION_ERROR: null
});

export const FORMATS_WHITELIST = ['BK', 'GRAPHIC_NOVEL'];
