import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import fines from './FinesReducer';
import checkedout from './CheckedOutReducer';
import borrowingHistory from './BorrowingHistoryReducer';
import holds from './HoldsReducer';
import borrowing from './BorrowingReducer';
import inactiveHolds from './InactiveHoldsReducer';
import interlibraryLoans from './InterlibraryLoansReducer';

export default combineReducers(
  Immutable.Map({
    borrowingHistory,
    fines,
    checkedout,
    holds,
    borrowing,
    inactiveHolds,
    interlibraryLoans
  })
);
