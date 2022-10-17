import { createReduxConstants } from '@bibliocommons/utils-redux';

export const PRIVACY_SETTINGS_MODAL_KEY = 'privacy-settings-modal';

export default createReduxConstants('Modal', {
  OPEN_MODAL: null,
  CLOSE_MODAL: null
});
