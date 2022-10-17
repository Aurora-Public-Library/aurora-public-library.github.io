import { createReduxConstants } from '@bibliocommons/utils-redux';

export default createReduxConstants('STACK_MAP', {
  REQUEST: null,
  SUCCESS: null,
  FAILURE: null,
  CLOSE: null
});
