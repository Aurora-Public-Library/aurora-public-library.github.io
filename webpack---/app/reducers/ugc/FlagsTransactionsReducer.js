import Immutable from 'immutable';
import FlagsConstants from 'app/constants/FlagsConstants';

const { ADD_FLAG_REQUEST, ADD_FLAG_SUCCESS, ADD_FLAG_FAILURE } = FlagsConstants;

const initialState = Immutable.Map();

export default function FlagsTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FLAG_REQUEST: {
      return state.mergeIn([action.contentId], { isAdding: true });
    }

    case ADD_FLAG_SUCCESS:
    case ADD_FLAG_FAILURE: {
      return state.delete(action.contentId);
    }

    default:
      return state;
  }
}
