import Immutable from 'immutable';
import ShelfConstants from '../../constants/ShelfConstants';

const initialState = Immutable.fromJS({
  isFetching: false,
  shelf: {
    userId: null,
    name: null,
    privateByDefault: false,
    facets: [],
    items: [],
    sort: {
      direction: null,
      fields: []
    },
    query: {
      filters: {}
    },
    pagination: {
      page: 0,
      pages: 1,
      limit: 25,
      count: 1
    }
  },
  summary: {
    shelves: []
  }
});

const {
  FETCH_FILTERS_REQUEST,
  FETCH_FILTERS_SUCCESS,
  SHELF_SEARCH_FAILURE,
  SHELF_SEARCH_REQUEST,
  SHELF_SEARCH_SUCCESS
} = ShelfConstants;

export default function shelfSearchReducer(state = initialState, action) {
  switch (action.type) {
    case SHELF_SEARCH_FAILURE:
      return initialState;

    case FETCH_FILTERS_REQUEST:
    case SHELF_SEARCH_REQUEST: {
      return state.merge({ isFetching: true });
    }

    case SHELF_SEARCH_SUCCESS: {
      return state.merge(
        Immutable.fromJS({
          shelf: action.payload.shelf,
          summary: action.payload.summary,
          isFetching: false
        })
      );
    }

    case FETCH_FILTERS_SUCCESS: {
      const fieldIndex = state.getIn(['shelf', 'facets']).findIndex(field => field.get('id') === action.payload.id);
      return state.setIn(['shelf', 'facets', fieldIndex], Immutable.fromJS({ ...action.payload, hasMore: true }));
    }

    default:
      return state;
  }
}
