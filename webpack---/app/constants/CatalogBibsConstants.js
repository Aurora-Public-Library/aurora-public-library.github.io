import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('CATALOG_BIBS', {
  FETCH_CATALOG_BIB_REQUEST: null,
  FETCH_CATALOG_BIB_SUCCESS: null,
  FETCH_CATALOG_BIB_FAILURE: null,
  FETCH_CATALOG_BIBS_REQUEST: null,
  FETCH_CATALOG_BIBS_SUCCESS: null,
  FETCH_CATALOG_BIBS_FAILURE: null
});
