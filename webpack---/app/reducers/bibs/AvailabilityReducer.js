import Immutable from 'immutable';
import BibConstants from '../../constants/BibConstants';

const initialState = Immutable.fromJS({
  errorClassification: null,
  items: [],
  probes: [],
  subscriptions: [],
  holdings: [],
  isLoaded: false,
  isFetching: false
});

export default function availability(state = initialState, action) {
  switch (action.type) {
    case BibConstants.FETCH_AVAILABILITY_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case BibConstants.FETCH_AVAILABILITY_FAILURE: {
      const { error = {} } = action.payload || {};
      return initialState.merge({
        isLoaded: true,
        isFetching: false,
        errorClassification: error.classification
      });
    }

    case BibConstants.FETCH_AVAILABILITY_SUCCESS: {
      const { errorClassification, items, probes, subscriptions, holdings } = action.payload.availability;
      return state.merge({
        errorClassification,
        items,
        probes,
        subscriptions,
        holdings,
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
