import Immutable from 'immutable';
import SummariesConstants from '../../constants/SummariesConstants';

const {
  ADD_SUMMARIES_REQUEST,
  ADD_SUMMARIES_SUCCESS,
  ADD_SUMMARIES_FAILURE,
  UPDATE_SUMMARIES_REQUEST,
  UPDATE_SUMMARIES_SUCCESS,
  UPDATE_SUMMARIES_FAILURE,
  REMOVE_SUMMARIES_REQUEST,
  REMOVE_SUMMARIES_SUCCESS,
  REMOVE_SUMMARIES_FAILURE
} = SummariesConstants;

const initialState = Immutable.Map();

export default function SummariesTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SUMMARIES_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case UPDATE_SUMMARIES_REQUEST: {
      return state.mergeIn([action.metadataId, action.summaryId], {
        isUpdating: true
      });
    }

    case REMOVE_SUMMARIES_REQUEST: {
      return state.mergeIn([action.metadataId, action.summaryId], {
        isRemoving: true
      });
    }

    case ADD_SUMMARIES_SUCCESS:
    case ADD_SUMMARIES_FAILURE:
    case UPDATE_SUMMARIES_SUCCESS:
    case UPDATE_SUMMARIES_FAILURE:
    case REMOVE_SUMMARIES_SUCCESS:
    case REMOVE_SUMMARIES_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
