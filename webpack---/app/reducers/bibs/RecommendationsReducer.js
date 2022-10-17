import Immutable from 'immutable';
import BibConstants from 'app/constants/BibConstants';

const { GET_RECOMMENDATIONS_REQUEST, GET_RECOMMENDATIONS_SUCCESS, GET_RECOMMENDATIONS_FAILURE } = BibConstants;

const initialState = Immutable.Map();

export default function RecommendationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECOMMENDATIONS_REQUEST:
    case GET_RECOMMENDATIONS_FAILURE: {
      return state;
    }

    case GET_RECOMMENDATIONS_SUCCESS: {
      return state.merge(action.payload.recommendations);
    }

    default:
      return state;
  }
}
