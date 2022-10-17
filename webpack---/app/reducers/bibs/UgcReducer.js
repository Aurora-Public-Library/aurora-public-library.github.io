import Immutable from 'immutable';
import pick from 'lodash/pick';
import BibConstants from 'app/constants/BibConstants';

const initialState = Immutable.fromJS({
  isLoaded: false,
  isFetching: false,
  staffComments: {
    results: []
  },
  communityComments: {
    results: []
  },
  quotations: {
    results: []
  },
  tags: {
    summaries: []
  },
  summaries: {
    results: []
  },
  videos: {
    results: []
  },
  ageSuitabilities: {
    results: []
  },
  summary: {}
});

export default function ugcReducer(state = initialState, action) {
  switch (action.type) {
    case BibConstants.FETCH_UGC_FAILURE:
      return initialState;

    case BibConstants.FETCH_UGC_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case BibConstants.FETCH_UGC_SUCCESS: {
      return state.merge({
        ...pick(action.payload.ugc, [
          'summary',
          'staffComments',
          'communityComments',
          'ratings',
          'quotations',
          'summaries',
          'videos',
          'ageSuitabilities',
          'tags',
          'flags',
          'likes'
        ]),
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
