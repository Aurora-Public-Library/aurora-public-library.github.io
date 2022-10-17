import Immutable from 'immutable';
import TagsConstants from 'app/constants/TagsConstants';

const initialState = Immutable.fromJS({
  summaries: [],
  pagination: {}
});

export default function tags(state = initialState, action) {
  switch (action.type) {
    case TagsConstants.FETCH_TAG_SUMMARIES_FAILURE: {
      return initialState;
    }

    case TagsConstants.FETCH_TAG_SUMMARIES_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case TagsConstants.FETCH_TAG_SUMMARIES_SUCCESS: {
      return state.merge({
        ...action.payload.ugc.tags,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
