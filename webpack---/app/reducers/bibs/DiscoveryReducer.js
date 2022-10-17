import Immutable from 'immutable';
import BibConstants from 'app/constants/BibConstants';
import pick from 'lodash/pick';

const initialState = Immutable.fromJS({
  isLoaded: false,
  isFetching: false,
  recommendations: {
    items: []
  },
  relatedTitles: {
    items: []
  },
  authorSuggestions: {
    items: []
  },
  seriesInfo: {
    items: []
  },
  staffLists: {
    items: []
  },
  communityLists: {
    items: []
  },
  otherLanguageTitles: {
    items: []
  }
});

export default function discoveryReducer(state = initialState, action) {
  switch (action.type) {
    case BibConstants.FETCH_DISCOVERY_FAILURE:
      return initialState;

    case BibConstants.FETCH_DISCOVERY_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case BibConstants.FETCH_DISCOVERY_SUCCESS: {
      return state.merge({
        ...pick(action.payload, [
          'recommendations',
          'relatedTitles',
          'authorSuggestions',
          'seriesInfo',
          'staffLists',
          'communityLists',
          'otherLanguageTitles'
        ]),
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
