import Immutable from 'immutable';
import QuotationsConstants from '../../constants/QuotationsConstants';

const {
  ADD_QUOTATION_REQUEST,
  ADD_QUOTATION_SUCCESS,
  ADD_QUOTATION_FAILURE,
  UPDATE_QUOTATION_REQUEST,
  UPDATE_QUOTATION_SUCCESS,
  UPDATE_QUOTATION_FAILURE,
  REMOVE_QUOTATION_REQUEST,
  REMOVE_QUOTATION_SUCCESS,
  REMOVE_QUOTATION_FAILURE
} = QuotationsConstants;

const initialState = Immutable.Map();

export default function QuotationsTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUOTATION_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case UPDATE_QUOTATION_REQUEST: {
      return state.mergeIn([action.metadataId, action.quotationId], {
        isUpdating: true
      });
    }

    case REMOVE_QUOTATION_REQUEST: {
      return state.mergeIn([action.metadataId, action.quotationId], {
        isRemoving: true
      });
    }

    case ADD_QUOTATION_SUCCESS:
    case ADD_QUOTATION_FAILURE:
    case UPDATE_QUOTATION_SUCCESS:
    case UPDATE_QUOTATION_FAILURE:
    case REMOVE_QUOTATION_SUCCESS:
    case REMOVE_QUOTATION_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
