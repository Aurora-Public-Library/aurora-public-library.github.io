import Immutable from 'immutable';
import BibConstants from '../../constants/BibConstants';

const initialState = Immutable.fromJS({
  shelves: {},
  borrowing: {
    holds: {},
    checkouts: {}
  },
  ugc: {},
  suggestForPurchase: {},
  isLoaded: false,
  isFetching: false
});

export default function userTransactions(state = initialState, action) {
  switch (action.type) {
    case BibConstants.FETCH_USER_TRANSACTIONS_FAILURE:
      return initialState;

    case BibConstants.FETCH_USER_TRANSACTIONS_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case BibConstants.FETCH_USER_TRANSACTIONS_SUCCESS: {
      const { shelves, borrowing, ugc, suggestForPurchase } = action.payload;
      return state.merge({
        shelves,
        borrowing,
        ugc,
        suggestForPurchase,
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
