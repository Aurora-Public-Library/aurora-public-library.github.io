import Immutable from 'immutable';
import InterlibraryLoansConstants from '../../constants/InterlibraryLoansConstants';

const { FETCH_ILL_REQUEST, FETCH_ILL_SUCCESS, FETCH_ILL_FAILURE } = InterlibraryLoansConstants;

const initialState = Immutable.Map();

export default function InterlibraryLoansReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ILL_SUCCESS:
    case FETCH_ILL_FAILURE: {
      const borrowing = action.payload.borrowing || {};
      const interlibraryLoans = borrowing.interlibraryLoans || {};
      return state
        .mergeDeep(interlibraryLoans)
        .set('results', Immutable.fromJS(interlibraryLoans.results))
        .set('isFetching', false);
    }

    case FETCH_ILL_REQUEST: {
      return state.set('isFetching', true);
    }

    default:
      return state;
  }
}
