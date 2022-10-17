import Immutable from 'immutable';
import AvailabilityDetailConstants from '../constants/AvailabilityDetailConstants';

const {
  OPEN_AVAILABILITY_DETAILS,
  CLOSE_AVAILABILITY_DETAILS,
  AVAILABILITY_DETAIL_REQUEST,
  AVAILABILITY_DETAIL_SUCCESS,
  AVAILABILITY_DETAIL_ERROR
} = AvailabilityDetailConstants;

const initialState = Immutable.Map({
  metadataId: null,
  items: Immutable.List(),
  subscriptions: Immutable.List(),
  marcHoldings: Immutable.List(),
  errorClassification: null,
  isFetching: false,
  open: false
});

export default function availabilityDetail(state = initialState, action) {
  switch (action.type) {
    case OPEN_AVAILABILITY_DETAILS: {
      return state.merge({
        metadataId: action.metadataId,
        open: true
      });
    }

    case CLOSE_AVAILABILITY_DETAILS: {
      return state.set('open', false);
    }

    case AVAILABILITY_DETAIL_REQUEST: {
      return state.set('isFetching', true);
    }

    case AVAILABILITY_DETAIL_SUCCESS: {
      const { bib, items, subscriptions, marcHoldings, errorClassification } = action.payload;
      return state.merge({
        metadataId: bib.metadataId,
        items,
        subscriptions,
        marcHoldings,
        errorClassification,
        isFetching: false
      });
    }

    case AVAILABILITY_DETAIL_ERROR: {
      return state.set('isFetching', false);
    }

    default:
      return state;
  }
}
