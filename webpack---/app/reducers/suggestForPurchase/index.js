import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import suggestForPurchaseTransactions from './SuggestForPurchaseTransactionsReducer';

export default combineReducers(
  Immutable.Map({
    suggestForPurchaseTransactions
  })
);
