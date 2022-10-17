import Immutable from 'immutable';
import RatingsConstants from '../../constants/RatingsConstants';

const {
  RATE_ITEM_REQUEST,
  RATE_ITEM_SUCCESS,
  RATE_ITEM_FAILURE,
  CHANGE_ITEM_RATING_REQUEST,
  CHANGE_ITEM_RATING_SUCCESS,
  CHANGE_ITEM_RATING_FAILURE,
  REMOVE_ITEM_RATING_REQUEST,
  REMOVE_ITEM_RATING_SUCCESS,
  REMOVE_ITEM_RATING_FAILURE
} = RatingsConstants;

const initialState = Immutable.Map();

export default function ratingsTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case RATE_ITEM_REQUEST:
    case CHANGE_ITEM_RATING_REQUEST:
    case REMOVE_ITEM_RATING_REQUEST: {
      return state.withMutations(newState => {
        action.metadataIds.forEach(id => newState.mergeIn([id], { isLoading: true }));
      });
    }

    case RATE_ITEM_SUCCESS:
    case RATE_ITEM_FAILURE:
    case CHANGE_ITEM_RATING_FAILURE:
    case CHANGE_ITEM_RATING_SUCCESS:
    case REMOVE_ITEM_RATING_SUCCESS:
    case REMOVE_ITEM_RATING_FAILURE: {
      return state.withMutations(newState => {
        action.metadataIds.forEach(id => newState.delete(id));
      });
    }

    default:
      return state;
  }
}
