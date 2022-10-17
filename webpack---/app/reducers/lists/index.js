import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import lists from './ListsReducer';
import currentUserLists from './CurrentUserListsReducer';
import listItemTransactions from './ListItemTransactionsReducer';

export default combineReducers(
  Immutable.Map({
    lists,
    currentUserLists,
    listItemTransactions
  })
);
