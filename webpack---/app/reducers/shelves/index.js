import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import importResult from './ImportResultReducer';
import shelfSearch from './ShelfSearchReducer';
import shelfTransactions from './ShelfTransactionsReducer';

export default combineReducers(
  Immutable.Map({
    importResult,
    shelfTransactions,
    shelfSearch
  })
);
