import Immutable from 'immutable';
import IOwnThisConstants from '../../constants/IOwnThisConstants';

const {
  CREATE_I_OWN_THIS_SETTING_REQUEST,
  CREATE_I_OWN_THIS_SETTING_SUCCESS,
  CREATE_I_OWN_THIS_SETTING_FAILURE,
  REMOVE_I_OWN_THIS_SETTING_REQUEST,
  REMOVE_I_OWN_THIS_SETTING_SUCCESS,
  REMOVE_I_OWN_THIS_SETTING_FAILURE
} = IOwnThisConstants;

const initialState = Immutable.Map();

export default function IOwnThisTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_I_OWN_THIS_SETTING_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case REMOVE_I_OWN_THIS_SETTING_REQUEST: {
      return state.mergeIn([action.metadataId, action.ownerSettingId], {
        isRemoving: true
      });
    }

    case CREATE_I_OWN_THIS_SETTING_SUCCESS:
    case CREATE_I_OWN_THIS_SETTING_FAILURE:
    case REMOVE_I_OWN_THIS_SETTING_SUCCESS:
    case REMOVE_I_OWN_THIS_SETTING_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
