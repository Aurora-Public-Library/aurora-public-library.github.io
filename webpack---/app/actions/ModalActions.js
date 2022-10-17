import ModalConstants from '../constants/ModalConstants';

export function openModal(modalKey, { authRequired = true, accountRequired = false, ...modalData } = {}) {
  return {
    modalKey,
    modalData,
    type: ModalConstants.OPEN_MODAL,
    middlewareData: {
      authRequired,
      accountRequired
    }
  };
}

export function closeModal(modalKey) {
  return {
    modalKey,
    type: ModalConstants.CLOSE_MODAL
  };
}

export default {
  openModal,
  closeModal
};
