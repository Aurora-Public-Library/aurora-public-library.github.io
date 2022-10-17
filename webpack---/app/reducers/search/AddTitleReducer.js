import Immutable from 'immutable';
import SearchConstants from '../../constants/SearchConstants';

// TOOD: zeroResults should go in facade layer

const DEFAULT_SEARCH_TYPE = 'smart';
const DEFAULT_PAGE = 1;

const initialState = Immutable.Map({
  isFetching: false,
  pagination: Immutable.Map({
    page: 1,
    pages: 1,
    limit: 25,
    count: 1
  }),
  results: Immutable.List(),
  searchQuery: Immutable.Map({
    query: null,
    page: DEFAULT_PAGE,
    searchType: DEFAULT_SEARCH_TYPE
  }),
  zeroResults: true
});

export default function addTitle(state = initialState, action) {
  switch (action.type) {
    case SearchConstants.ADD_TITLE_SEARCH_FAILURE:
      return initialState;

    case SearchConstants.ADD_TITLE_SEARCH_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case SearchConstants.ADD_TITLE_SEARCH_SUCCESS: {
      const { results, pagination } = action.payload.catalogSearch;
      return state.merge({
        results,
        pagination,
        searchQuery: state.get('searchQuery').merge(action.searchQuery),
        isFetching: false,
        zeroResults: results.length <= 0
      });
    }

    default:
      return state;
  }
}
