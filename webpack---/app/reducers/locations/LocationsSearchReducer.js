import Immutable from 'immutable';
import LocationsConstants from 'app/constants/LocationsConstants';

const initialState = Immutable.fromJS({
  results: [],
  distances: {},
  query: {},
  isFetching: false
});

export default function locationsSearch(state = initialState, action) {
  switch (action.type) {
    case LocationsConstants.SEARCH_LOCATIONS_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case LocationsConstants.SEARCH_LOCATIONS_SUCCESS: {
      const { results, distances } = action.payload.locations;
      return state.merge({
        results,
        distances,
        query: action.query,
        isFetching: false
      });
    }

    case LocationsConstants.SEARCH_LOCATIONS_FAILURE: {
      return initialState;
    }

    default:
      return state;
  }
}
