import Immutable from 'immutable';
import ModalConstants from '../../constants/ModalConstants';

const initialState = Immutable.Map();

export default function modal(state = initialState, action) {
  switch (action.type) {
    case ModalConstants.OPEN_MODAL: {
      const { modalKey, modalData } = action;
      if (state.getIn([modalKey, 'open'])) {
        // When multiple modals have the same key, all of them would
        // be opened by this action, which leads to lots of issues.
        // This can happen when the component is rendered multiple
        // times on the page, using the same modalKey.
        throw new Error(
          `Another modal with the modalKey "${modalKey}" is already open. Each modal instance must have a unique key.`
        );
      }

      return state.set(modalKey, Immutable.fromJS({ ...modalData, open: true }));
    }

    case ModalConstants.CLOSE_MODAL:
      return initialState;

    default:
      return state;
  }
}
