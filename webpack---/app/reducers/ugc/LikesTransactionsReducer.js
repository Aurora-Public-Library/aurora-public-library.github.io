import Immutable from 'immutable';
import LikesConstants from 'app/constants/LikesConstants';

const { ADD_LIKE_REQUEST, ADD_LIKE_SUCCESS, ADD_LIKE_FAILURE } = LikesConstants;

const initialState = Immutable.Map();

export default function LikesTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LIKE_REQUEST:
    case ADD_LIKE_FAILURE: {
      return state;
    }

    case ADD_LIKE_SUCCESS: {
      return state.merge(action.payload.ugc.likes);
    }

    default:
      return state;
  }
}
