import { createReduxConstants } from '@bibliocommons/utils-redux';

export const HIDDEN_NOTICES_COOKIE = 'hidden_notices';

export default createReduxConstants('NOTICE', {
  DISMISS_NOTICE: null
});
