import Immutable from 'immutable';
import RecentlyReturnedConstants from '../../constants/RecentlyReturnedConstants';
import BorrowingConstants from '../../constants/BorrowingConstants';

const {
  FETCH_RETURN_HISTORY_REQUEST,
  FETCH_RETURN_HISTORY_SUCCESS,
  FETCH_RETURN_HISTORY_FAILURE
} = RecentlyReturnedConstants;

const initialState = Immutable.fromJS({
  results: [],
  isFetching: false
});

export default function borrowingHistory(state = initialState, action) {
  switch (action.type) {
    case FETCH_RETURN_HISTORY_SUCCESS:
    case FETCH_RETURN_HISTORY_FAILURE: {
      const borrowing = action.payload.borrowing || {};
      const history = borrowing.borrowingHistory || {};
      return state.merge(history).set('isFetching', false);
    }

    case FETCH_RETURN_HISTORY_REQUEST: {
      return state.set('isFetching', true);
    }

    case BorrowingConstants.TOGGLE_BORROWING_VIEW:
      return state.merge({ view: action.view });

    default:
      return state;
  }
}
