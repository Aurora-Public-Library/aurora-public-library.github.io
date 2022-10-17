import Immutable from 'immutable';
import EventsConstants from '../../constants/EventsConstants';

const initialState = Immutable.fromJS({
  results: [],
  featuredEvent: {},
  pagination: {},
  facetFields: {},
  query: {},
  isFetching: false,
  eventsRSSLink: ''
});

export default function eventsSearch(state = initialState, action) {
  switch (action.type) {
    case EventsConstants.SEARCH_EVENTS_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case EventsConstants.SEARCH_EVENTS_SUCCESS: {
      return state.merge({
        ...action.payload.events,
        query: action.query,
        isFetching: false,
        eventsRSSLink: action.payload.eventsRSSLink
      });
    }

    case EventsConstants.SEARCH_EVENTS_FAILURE: {
      return initialState;
    }

    case EventsConstants.FETCH_CALLOUT_FEATURED_EVENT_SUCCESS: {
      return state.merge({
        featuredEvent: action.payload.events.items[0]
      });
    }

    default:
      return state;
  }
}
