import Immutable from 'immutable';
import ContentAdvisoriesConstants from 'app/constants/ContentAdvisoriesConstants';

const {
  GET_CONTENT_ADVISORIES_REQUEST,
  GET_CONTENT_ADVISORIES_SUCCESS,
  GET_CONTENT_ADVISORIES_FAILURE
} = ContentAdvisoriesConstants;

const initialState = Immutable.Map({
  isFetching: false
});

export default function ContentNoticesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTENT_ADVISORIES_REQUEST: {
      return state.set('isFetching', true);
    }
    case GET_CONTENT_ADVISORIES_FAILURE: {
      return state.set('isFetching', false);
    }

    case GET_CONTENT_ADVISORIES_SUCCESS: {
      return state.merge({ ...action.payload.ugc.contentAdvisories, isFetching: false });
    }

    default:
      return state;
  }
}
