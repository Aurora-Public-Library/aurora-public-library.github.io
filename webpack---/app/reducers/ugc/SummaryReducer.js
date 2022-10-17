import Immutable from 'immutable';
import SummariesConstants from 'app/constants/SummariesConstants';

const { GET_SUMMARY_REQUEST, GET_SUMMARY_SUCCESS, GET_SUMMARY_FAILURE } = SummariesConstants;

const initialState = Immutable.Map();

export default function SummaryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUMMARY_REQUEST:
    case GET_SUMMARY_FAILURE: {
      return initialState;
    }

    case GET_SUMMARY_SUCCESS: {
      return state.merge(action.payload.ugc.summary);
    }

    default:
      return state;
  }
}
