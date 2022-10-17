import Immutable from 'immutable';
import SummariesConstants from 'app/constants/SummariesConstants';

const { GET_SUMMARIES_REQUEST, GET_SUMMARIES_SUCCESS, GET_SUMMARIES_FAILURE } = SummariesConstants;

const initialState = Immutable.Map({
  isFetching: false
});

export default function SummariesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUMMARIES_REQUEST: {
      return state.set('isFetching', true);
    }
    case GET_SUMMARIES_FAILURE: {
      return state.set('isFetching', false);
    }

    case GET_SUMMARIES_SUCCESS: {
      return state.merge({ ...action.payload.ugc.summaries, isFetching: false });
    }

    default:
      return state;
  }
}
