import keyMirror from 'keymirror';
import { createReduxConstants } from '@bibliocommons/utils-redux';

export const GLOBAL_MESSAGING_ID = 'global-messaging-id';

export const STATUS_TYPES = keyMirror({
  Success: null,
  Failure: null,
  Neutral: null
});

export default createReduxConstants('MESSAGING', {
  CLEAR_MESSAGING: null
});
