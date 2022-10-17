import Immutable from 'immutable';
import CardsConstants from 'app/constants/CardsConstants';

const initialState = Immutable.fromJS({
  results: [],
  isFetching: false
});

export default function cardSearchReducer(state = initialState, action) {
  switch (action.type) {
    case CardsConstants.SEARCH_CARDS_FAILURE:
      return initialState;

    case CardsConstants.SEARCH_CARDS_REQUEST: {
      return state.merge({
        results: [],
        isFetching: true
      });
    }

    case CardsConstants.SEARCH_CARDS_SUCCESS: {
      return state.merge({
        ...action.payload.cards,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
