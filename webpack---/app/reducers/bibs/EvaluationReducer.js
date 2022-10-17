import Immutable from 'immutable';
import BibConstants from 'app/constants/BibConstants';
import pick from 'lodash/pick';

const initialState = Immutable.fromJS({
  isLoaded: false,
  isFetching: false,
  authorNotes: {},
  reviews: {
    items: []
  },
  mediaSummaries: {},
  relatedAuthors: {
    items: []
  },
  excerpt: {},
  externalResources: {
    items: []
  }
});

export default function evaluationReducer(state = initialState, action) {
  switch (action.type) {
    case BibConstants.FETCH_EVALUATION_FAILURE:
      return initialState;

    case BibConstants.FETCH_EVALUATION_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case BibConstants.FETCH_EVALUATION_SUCCESS: {
      return state.merge({
        ...pick(action.payload, [
          'authorNote',
          'reviews',
          'mediaSummary',
          'relatedAuthors',
          'excerpt',
          'externalResources'
        ]),
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
