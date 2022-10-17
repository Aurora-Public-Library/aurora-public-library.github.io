import Immutable from 'immutable';
import BibConstants from 'app/constants/BibConstants';

const initialState = Immutable.fromJS({
  items: [],
  isLoaded: false,
  isFetching: false
});

export default function holdableItems(state = initialState, action) {
  switch (action.type) {
    case BibConstants.FETCH_HOLDABLE_ITEMS_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case BibConstants.FETCH_HOLDABLE_ITEMS_FAILURE: {
      return initialState;
    }

    case BibConstants.FETCH_HOLDABLE_ITEMS_SUCCESS: {
      return state.merge({
        ...action.payload.holdableItems,
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
