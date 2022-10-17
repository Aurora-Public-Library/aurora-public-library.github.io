import Immutable from 'immutable';
import AgeSuitabilitiesConstants from '../../constants/AgeSuitabilitiesConstants';

const {
  ADD_AGE_SUITABILITIES_REQUEST,
  ADD_AGE_SUITABILITIES_SUCCESS,
  ADD_AGE_SUITABILITIES_FAILURE,
  UPDATE_AGE_SUITABILITIES_REQUEST,
  UPDATE_AGE_SUITABILITIES_SUCCESS,
  UPDATE_AGE_SUITABILITIES_FAILURE,
  REMOVE_AGE_SUITABILITIES_REQUEST,
  REMOVE_AGE_SUITABILITIES_SUCCESS,
  REMOVE_AGE_SUITABILITIES_FAILURE
} = AgeSuitabilitiesConstants;

const initialState = Immutable.Map();

export default function AgeSuitabilitiesTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_AGE_SUITABILITIES_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case UPDATE_AGE_SUITABILITIES_REQUEST: {
      return state.mergeIn([action.metadataId, action.ageSuitabilityId], {
        isUpdating: true
      });
    }

    case REMOVE_AGE_SUITABILITIES_REQUEST: {
      return state.mergeIn([action.metadataId, action.ageSuitabilityId], {
        isRemoving: true
      });
    }

    case ADD_AGE_SUITABILITIES_SUCCESS:
    case ADD_AGE_SUITABILITIES_FAILURE:
    case UPDATE_AGE_SUITABILITIES_SUCCESS:
    case UPDATE_AGE_SUITABILITIES_FAILURE:
    case REMOVE_AGE_SUITABILITIES_SUCCESS:
    case REMOVE_AGE_SUITABILITIES_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
