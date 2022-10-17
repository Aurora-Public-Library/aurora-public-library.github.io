import { createReduxConstants } from '@bibliocommons/utils-redux';

export const INTER_LIBRARY_STATUS_TYPES = {
  READY: 'READY',
  IN_TRANSIT: 'IN_TRANSIT',
  SHIPPED: 'SHIPPED',
  NOT_READY: 'NOT_READY',
  INACTIVE: 'INACTIVE'
};

export default createReduxConstants('ILL', {
  FETCH_ILL_REQUEST: null,
  FETCH_ILL_SUCCESS: null,
  FETCH_ILL_FAILURE: null
});
