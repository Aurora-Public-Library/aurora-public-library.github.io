import { createReduxConstants } from '@bibliocommons/utils-redux';

export const WEEKDAYS_ORDER = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default createReduxConstants('LOCATIONS', {
  SEARCH_LOCATIONS_REQUEST: null,
  SEARCH_LOCATIONS_SUCCESS: null,
  SEARCH_LOCATIONS_FAILURE: null
});
