import Immutable from 'immutable';
import BibConstants from 'app/constants/BibConstants';

const { GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, GET_REVIEWS_FAILURE } = BibConstants;

const initialState = Immutable.Map();

export default function ReviewsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
    case GET_REVIEWS_FAILURE: {
      return state;
    }

    case GET_REVIEWS_SUCCESS: {
      return state.merge(action.payload.reviews);
    }

    default:
      return state;
  }
}
